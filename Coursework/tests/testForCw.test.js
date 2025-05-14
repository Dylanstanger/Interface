import exp from 'constants'; 
const { test, expect} = require('@playwright/test');
const websiteURL = ' http://localhost:8000/';

//before every test, go to the index and back to the add a vehicle page 
test.beforeEach(async ({ page }) => {
   await page.goto(websiteURL);
    await page.getByRole('link', { name: 'Add a Vehicle' }).click();
});

//No owner input
test('search for owner with no owner input', async ({ page }) => {
    await page.getByRole('button', { name: 'Check owner' }).click();
    await expect(page.locator('#results-owner').locator('div')).toHaveCount(0)
});

//Try find New owner button before owner check pressed
test('look for new owner button prior to check owner being pressed', async ({page}) => {

    const newOwnerButton = page.getByRole('button', { name: 'New Owner' });
    await expect(newOwnerButton).toHaveCount(0);

});

//See if error message given when not all values in add owner are filled
test('Add owner without all filled', async ({page}) => {

    //missing name
    await page.locator('#owner').fill('s')
    await page.getByRole('button', { name: 'Check owner' }).click();
    await page.getByRole('button', {name: 'New owner'}).click();
    await page.locator('#address').fill('StoneHouse')
    await page.locator('#dob').fill('17-06-2005')
    await page.locator('#license').fill('ABCDEFG')
    await page.locator('#expire').fill('17-06-2030')
    await page.getByRole('button', {name: 'Add owner'}).click(); 
    await expect(page.locator('#message-owner')).toContainText('Error')
    await page.reload();


    //missing address
    await page.locator('#owner').fill('s')
    await page.getByRole('button', { name: 'Check owner' }).click();
    await page.getByRole('button', {name: 'New owner'}).click();
    await page.locator('#name').fill('James')
    await page.locator('#dob').fill('17-06-2005')
    await page.locator('#license').fill('ABCDEFG')
    await page.locator('#expire').fill('17-06-2030')
    await page.getByRole('button', {name: 'Add owner'}).click(); 
    await expect(page.locator('#message-owner')).toContainText('Error')
    await page.reload();

    //missing dob
    await page.locator('#owner').fill('s')
    await page.getByRole('button', { name: 'Check owner' }).click();
    await page.getByRole('button', {name: 'New owner'}).click();
    await page.locator('#name').fill('James')
    await page.locator('#address').fill('StoneHouse')
    await page.locator('#license').fill('ABCDEFG')
    await page.locator('#expire').fill('17-06-2030')
    await page.getByRole('button', {name: 'Add owner'}).click(); 
    await expect(page.locator('#message-owner')).toContainText('Error')
    await page.reload();

    //missing license
    await page.locator('#owner').fill('s')
    await page.getByRole('button', { name: 'Check owner' }).click();
    await page.getByRole('button', {name: 'New owner'}).click();
    await page.locator('#name').fill('James')
    await page.locator('#address').fill('StoneHouse')
    await page.locator('#dob').fill('17-06-2005')
    await page.locator('#expire').fill('17-06-2030')
    await page.getByRole('button', {name: 'Add owner'}).click(); 
    await expect(page.locator('#message-owner')).toContainText('Error')
    await page.reload();

    //missing expire
    await page.locator('#owner').fill('s')
    await page.getByRole('button', { name: 'Check owner' }).click();
    await page.getByRole('button', {name: 'New owner'}).click();
    await page.locator('#name').fill('James')
    await page.locator('#address').fill('StoneHouse')
    await page.locator('#dob').fill('17-06-2005')
    await page.locator('#license').fill('ABCDEFG')
    await page.getByRole('button', {name: 'Add owner'}).click();
    await expect(page.locator('#message-owner')).toContainText('Error')
    await page.reload(); 
});

//Test new owner with exactly same details as existing
test('Add owner with identical info', async ({page}) => {

    await page.locator('#owner').fill('s')
    await page.getByRole('button', { name: 'Check owner' }).click();
    await page.getByRole('button', {name: 'New owner'}).click();
    await page.locator('#name').fill('Lewis Thomson')
    await page.locator('#address').fill('Nottingham')
    await page.locator('#dob').fill('1949-01-15')
    await page.locator('#license').fill('RW765FR')
    await page.locator('#expire').fill('2018-03-25')
    await page.getByRole('button', {name: 'Add owner'}).click(); 
    await expect(page.locator('#message-owner')).toContainText('Error')
});

//Test add vehicle with missing values
test('Add vehicle with missing values', async ({page}) => {

    //not selecting owner
    await page.locator('#rego').fill('FY68 XHE')
    await page.locator('#make').fill('Mclaren')
    await page.locator('#model').fill('Speedtail')
    await page.locator('#colour').fill('Blue')
    await page.getByRole('button', {name: 'Add vehicle'}).click(); 
    await expect(page.locator('#message-vehicle')).toContainText('Error')
    await page.reload();

    //missing rego
    await page.locator('#owner').fill('Rachel Smith')
    await page.getByRole('button', { name: 'Check owner' }).click();
    await page.getByRole('button', { name: 'Select Owner' }).click();
    await page.locator('#make').fill('Mclaren')
    await page.locator('#model').fill('Speedtail')
    await page.locator('#colour').fill('Blue')
    await page.getByRole('button', {name: 'Add vehicle'}).click(); 
    await expect(page.locator('#message-vehicle')).toContainText('Error')
    await page.reload();

    //missing make
    await page.locator('#owner').fill('Rachel Smith')
    await page.getByRole('button', { name: 'Check owner' }).click();
    await page.getByRole('button', { name: 'Select Owner' }).click();
    await page.locator('#rego').fill('FY68 XHE')
    await page.locator('#model').fill('Speedtail')
    await page.locator('#colour').fill('Blue')
    await page.getByRole('button', {name: 'Add vehicle'}).click(); 
    await expect(page.locator('#message-vehicle')).toContainText('Error')
    await page.reload();

    //missing model
    await page.locator('#owner').fill('Rachel Smith')
    await page.getByRole('button', { name: 'Check owner' }).click();
    await page.getByRole('button', { name: 'Select Owner' }).click();
    await page.locator('#rego').fill('FY68 XHE')
    await page.locator('#make').fill('Mclaren')
    await page.locator('#colour').fill('Blue')
    await page.getByRole('button', {name: 'Add vehicle'}).click(); 
    await expect(page.locator('#message-vehicle')).toContainText('Error')
    await page.reload();

    //missing colour
    await page.locator('#owner').fill('Rachel Smith')
    await page.getByRole('button', { name: 'Check owner' }).click();
    await page.getByRole('button', { name: 'Select Owner' }).click();
    await page.locator('#rego').fill('FY68 XHE')
    await page.locator('#make').fill('Mclaren')
    await page.locator('#model').fill('Speedtail')
    await page.getByRole('button', {name: 'Add vehicle'}).click(); 
    await expect(page.locator('#message-vehicle')).toContainText('Error')
    

});

//add a new owner and vehicle and search for them
test('Test everything correct', async ({page}) => {

    //add owner
    await page.locator('#owner').fill('Dylan Stanger')
    await page.getByRole('button', { name: 'Check owner' }).click();
    await page.getByRole('button', {name: 'New owner'}).click();
    await page.locator('#name').fill('Dylan Stanger')
    await page.locator('#address').fill('StoneHouse')
    await page.locator('#dob').fill('17-06-2005')
    await page.locator('#license').fill('ABCDEFG')
    await page.locator('#expire').fill('17-06-2030')
    await page.getByRole('button', {name: 'Add owner'}).click(); 
    await expect(page.locator('#message-owner')).toContainText('Owner added successfully')

    //add vehicle
    await page.locator('#rego').fill('FY68 XHE')
    await page.locator('#make').fill('Mclaren')
    await page.locator('#model').fill('Speedtail')
    await page.locator('#colour').fill('Blue')
    await page.getByRole('button', {name: 'Add vehicle'}).click(); 
    await expect(page.locator('#message-vehicle')).toContainText('Vehicle added successfully')

    //search for new owner in db
    await page.getByRole('link', {name: 'People search'}).click();
    await page.locator('#name').fill('Dylan Stanger')
    await page.getByRole('button', {name: 'Submit'}).click();
    await expect(page.locator('#results')).toContainText('ABCDEFG')

    //search for new vehicle in db
    await page.getByRole('link', {name: 'Vehicle search'}).click();
    await page.locator('#rego').fill('FY68 XHE')
    await page.getByRole('button', {name: 'Submit'}).click();
    await expect(page.locator('#results')).toContainText('Dylan Stanger')


});
