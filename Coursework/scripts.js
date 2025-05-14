import { createClient } from 
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://ktrhdcncdjcclfhwetga.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cmhkY25jZGpjY2xmaHdldGdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwOTIwNjcsImV4cCI6MjA2MTY2ODA2N30.1D0hRo409xONRqaErQtd82pzFHl9ggI5J5qWOU7zo78')
const path = window.location.pathname;
let selectedOwner ='';
let selectedID = 0;

async function PeopleSearchFunc() {


    //assign all the variables
    const name = document.getElementById('name').value.trim();
    const license = document.getElementById('license').value.trim();
    const results = document.getElementById('results');
    const message = document.getElementById('message');
    let data = null;
    let error = null;

    //clear results box
    results.innerHTML ='';
 
    if((name&&license) || (!name&&!license) ) {
        message.textContent = "Error: exactly one of the forms must be used";
    } else {

        if(name) {
            const response = await supabase
                .from('People')
                .select('*')
                .ilike('Name', `%${name}%`);
            data = response.data;
        }
        else if (license) {
            const response2 = await supabase
                .from('People')
                .select('*')
                .ilike('LicenseNumber', `%${license}%`);
            data = response2.data;
        }
        
      
        if(data==0)
            message.textContent = 'No result found'
        else {
            //create div for each element
            data.forEach(element => {
                const div = document.createElement('div');
                div.classList.add('results-div');

                //fill div with text from Json object
                for (const [key, value] of Object.entries(element)) {
                    const line = document.createElement('p');
                    line.textContent = `${key}: ${value}`;
                    div.appendChild(line);
            }
            results.appendChild(div);   
            });
            message.textContent = 'Search successful'  
        }
            

    }
}



async function VehicleSearchFunc() {

    //assign all variables
    let data = null;
    const rego = document.getElementById('rego').value.trim();
    const message = document.getElementById('message');
    const results = document.getElementById('results');

    //clear results
    results.innerHTML ='';

    if(!rego){
        message.textContent = "Error: Please enter a vehicle registration"
    } else {
        const response = await supabase
            .from('Vehicles')
            .select(` VehicleID, Make, Model, Colour , 
            People (Name, LicenseNumber)`)
            .ilike('VehicleID', `%${rego}%`);

            data = response.data;
            
                if(data==0)
                    message.textContent = 'No result found'
                else {
                    //create div for each element
                    data.forEach(element => {
                        const div = document.createElement('div');
                        div.classList.add('results-div');

                        //fill div with text from Json object
                        for (const [key, value] of Object.entries(element)) {
                            if(typeof value == 'object' && value!==null ) {
                    
                                for (const [key2, value2] of Object.entries(value)) {
                                const line = document.createElement('p');
                                line.textContent = `${key2}: ${value2}`;
                                div.appendChild(line);
                                }
                            } else if (value == null) {
                                const line3 = document.createElement('p');
                                line3.textContent = 'Name: Unknown';
                                const line4 = document.createElement('p');
                                line4.textContent = 'LicenseNumber: Unknown';
                                div.appendChild(line3);
                                div.appendChild(line4);
                            }else {
                                const line2 = document.createElement('p');
                                line2.textContent = `${key}: ${value}`;
                                div.appendChild(line2);
                            }   
                    }
                    results.appendChild(div);   
                });

                    message.textContent = 'Search successful'                    
                }
    }
}

async function selectOwnerFunc () {
    const owner = document.getElementById('owner').value.trim();
    
    const results = document.getElementById('owner-results');
    const newOwner = document.getElementById('newOwner');
    
    

    let data = null;
    


    if (owner === "") {
        return;
    }

    else {      
        results.innerHTML ='';

        const response = await supabase
            .from('People')
            .select('*')
            .ilike('Name', `%${owner}%`);
    
        data = response.data;
        
            data.forEach(element => {
                const div = document.createElement('div');
                div.classList.add('results-div');

                //fill div with text from Json object
                for (const [key, value] of Object.entries(element)) {
                    const line = document.createElement('p');
                    line.textContent = `${key}: ${value}`;
                    div.appendChild(line);
                }

                const select = document.createElement('button');
                select.textContent = 'Select Owner';
                select.addEventListener('click', function () {
                    selectedOwner = element.Name;
                    selectedID = element.PersonID;
                    select.textContent = "Owner Selected";
                });
                div.appendChild(select);

            results.appendChild(div);
            });

            //create new owner button and when clicked reveals hidden form
            newOwner.innerHTML='';
            const newOwnerButton = document.createElement('button');
            newOwnerButton.textContent = 'New Owner';
            newOwnerButton.addEventListener('click', function () {

                addOwnerForm = document.getElementById('addOwnerForm');

                addOwnerForm.style.display ='block';
            });

            newOwner.appendChild(newOwnerButton);

            //add functionality to the add owner button
            addOwnerForm.addEventListener('submit', async function(event) {
                event.preventDefault();

                const newName = document.getElementById('name').value.trim();
                const address = document.getElementById('address').value.trim();
                const dob = document.getElementById('dob').value.trim();
                const license = document.getElementById('license').value.trim();
                const expire = document.getElementById('expire').value.trim();
                const addOwnerForm = document.getElementById('addOwnerForm');
                const messageOwner = document.getElementById('message-owner');

                if(newName ===''||address===''||dob===''||license===''|expire==='') {
                    messageOwner.textContent = 'Error: Please fill in every box';
                } else {

                    const newOwnerDataToMatch ={
                        Name: newName,
                        Address: address,
                        DOB: dob,
                        LicenseNumber: license,
                        ExpiryDate: expire,
                    };

                    const { data, error } = await supabase
                        .from('People')
                        .select('*')
                        .match(newOwnerDataToMatch);

                        if(data.length >0) {
                            messageOwner.textContent = 'Error: There is already an owner with these details'
                    
                        }
                        else {
                    
                            const getTableRowNum = await supabase
                            .from('People')
                            .select('*'); 

                            const count = getTableRowNum.data.length
                            
                            const newOwnerData ={
                                PersonID: (count+1),
                                Name: newName,
                                Address: address,
                                DOB: dob,
                                LicenseNumber: license,
                                ExpiryDate: expire,
                            };

                            await supabase
                            .from('People')
                            .insert([newOwnerData]);

                            messageOwner.textContent = 'Owner added successfully';
                            selectedOwner =newName;
                             
                    }
                }   
            });
    }       
}


async function addVehicleFunc () {

    
    const rego = document.getElementById('rego').value.trim();
    const make = document.getElementById('make').value.trim();
    const model = document.getElementById('model').value.trim();
    const colour = document.getElementById('colour').value.trim();
    const messageVehicle = document.getElementById('message-vehicle');

    if(selectedOwner==='') {
        messageVehicle.textContent = 'Please select an owner before adding vehicle';
    }
    else if(rego===''||make===''||model===''||colour==='') {
        messageVehicle.textContent='Error: Please fill in every vehicle box';
    }
    else {
 
        //create object with inputed data
        const newVehicleData = {
            VehicleID: rego,
            Make: make,
            Model: model,
            Colour: colour,
            OwnerID: selectedID,
        };

        //add to databse
        await supabase
        .from('Vehicles')
        .insert([newVehicleData]);



        messageVehicle.textContent='Vehicle added successfully';
    }
}



if (path.includes('vehicleSearch.html')) {
    document.getElementById('vehicle reg form').addEventListener('submit', function (event) {
        event.preventDefault();
        VehicleSearchFunc(); 
    });
}

else if (path.includes('addAVehicle.html')) {
    document.getElementById('addVehicle').addEventListener('submit', function (event) {
        event.preventDefault();
        selectOwnerFunc(); 
    });
    document.getElementById('addVehicleButton').addEventListener('click', addVehicleFunc);
}

else {
    document.getElementById('driverName').addEventListener('submit', function (event) {
        event.preventDefault();
        PeopleSearchFunc(); 
    });
}


