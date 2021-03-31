# Angular Airlines Frontend

This project is to demonstrate some of the Spreedly API functionality. Works in tandem with https://github.com/scottmtraver/angular-airlines-be Angular Backend and uses Spreedly Express


## Development server

Install the required JS packages with `npm install`

Update `src/app/spreedly.service.ts line 33` with your spreedly environment key (*improvement to be put in a build var)

Run the development server with `ng serve` or `npm start`

## App Pages / Structure

The app is structured by routable components with a master navigation header for ease of use.

- List flights page (homepage)
- Flight details Page - from here if you have a payment method you can use express checkout (which will purchase a flight through the passthrough api)
- Flight checkout page - from here you can manage your card information and make a regular purchase (through the purchase api)
- transactions - a listing page of recent spreedly transactions