import { createClient } from 
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://ktrhdcncdjcclfhwetga.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cmhkY25jZGpjY2xmaHdldGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwOTIwNjcsImV4cCI6MjA2MTY2ODA2N30.1D0hRo409xONRqaErQtd82pzFHl9ggI5J5qWOU7zo78')
const path = window.location.pathname;

async function PeopleSearchFunc() {
    
    const name = document.getElementById('name').value.trim();
    const license = document.getElementById('license').value.trim();
    const results = document.getElementById('results');
    const message = document.getElementById('message');
    let data = null;
    let error = null;
 
    if((name&&license) || (!name&&!license) ) {
        message.textContent = "Error: exactly one of the forms must be used";
    } else {

        if(name) {
            const response = await supabase
                .from('People')
                .select('*')
                .ilike('Name', `%${name}%`);
            data = response.data;
            error = response.error;
        }
        else if (license) {
            const response2 = await supabase
                .from('People')
                .select('*')
                .ilike('LicenseNumber', `%${license}%`);
            data = response2.data;
            error = response2.error;
        }
        
      
        if(data==0)
            message.textContent = 'No result found'
        else {
            message.textContent = 'Search successful'                
            results.textContent = JSON.stringify(data, null, 2);
        }
            

    }
}

async function VehicleSearchFunc() {

    const rego = getElementById('rego').value.trim();
    const message = getElementById('message');
    const results = getElementById('results');

    const {data,error} = await supabase
            .from('People')
            .select(`
                Name,
                LicenseNumber,
                Vehicles (
                    *
                )
            `)
            .ilike('VehicleID', `%${rego}%`);

            if(data==0)
                message.textContent = 'No result found'
            else {
                message.textContent = 'Search successful'                
                results.textContent = JSON.stringify(data, null, 2);
            }
}


if(path.includes('index.html')) {
    document.getElementById('driverName').addEventListener('submit', function (event) {
        event.preventDefault();
        PeopleSearchFunc(); 
    });
    document.getElementById('licenseNumber').addEventListener('submit', function (event) {
        event.preventDefault();
        PeopleSearchFunc(); 
    });
    document.getElementById('submitPeople').addEventListener('click', PeopleSearchFunc);
}

else if (path.includes('vehicleSearch.html')) {
    document.getElementById('submitVehicle').addEventListener('click', VehicleSearchFunc);
}



