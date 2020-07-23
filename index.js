const chalk = require('chalk');
const db = require('./db');

const cmds = ['create_parking_lot','park', 'leave','status']; // Available commands

// Commands args and description
const cmdInfo = {
    create_parking_lot: {args: 'capacity', desc: 'Create parking lot of size n'},
    park: {args: 'car_number', desc: 'Park a car'},
    leave: {args: ['car_number', 'hours'], desc: 'Unpark a car'},
    status: {desc: 'Print status of parking slot'}
}

// Commands help
const help = () => {
    console.log(chalk.white('Available commands:'))
    cmds.forEach(cmd => {
        const argTabs = cmd === 'create_parking_lot' ? '\t' : '\t\t\t';
        const descTabs = cmd === 'leave' ? '\t': cmd === 'status' ? '\t\t\t' : '\t\t';

        const {args, desc} = cmdInfo[cmd]; // Extract args and description

        // Preparing cli command
        let cli = `\t${chalk.green(cmd)}${argTabs} ${
            typeof args !== 'undefined' 
            ? `{${chalk.white(typeof args == 'object' ? args.join('} {') : args)}}`
            : '' 
        } ${descTabs} ${desc}`;

        console.log(cli);
    });
}

const createParkingLot = (capacity) => {
    if (typeof capacity === 'undefined') { // If capacity not provided
        console.log(chalk.red('Capacity is required'));
        return;
    }

    const cap = parseInt(capacity); // Parse to integer
    if (isNaN(cap)) {
        console.log(chalk.red('Capacity must be in number format'));
        return;
    }

    db.query(`INSERT OR REPLACE INTO setting(id, metaName , metaValue) VALUES(1, 'parkingLot', ${cap});`);
    console.log(chalk.green(`Created parking lot with ${cap} slots`));
}

const parkCar = async (carNumber) => {
    try {
        // Get car parking alloted number
        const setting = await db.select('SELECT metaValue FROM setting WHERE id=1');
        const lotNumber = parseInt(setting['metaValue']);

        // Get how many cars parked already in parking
        const parking = await db.select('SELECT COUNT(1) AS carParked FROM parking');
        const carParked = parking.carParked || 0;

        // If parking full
        if (carParked == lotNumber) {
            console.log(chalk.red('Sorry, parking lot is full'));
            return;
        }
        
        // Filter to check duplicate car entry
        const checkCar = await db.select(`SELECT COUNT(1) as alreadyParked FROM parking WHERE carNumber='${carNumber}'`);
        if (checkCar.alreadyParked) {
            console.log(chalk.red(`Duplicate entry for parked car ${carNumber}.`));
            return;
        }

        const slotNumber = carParked + 1; // Slot number

        // Park a car
        await db.query(`INSERT INTO parking(carNumber, slotNumber) VALUES('${carNumber}', ${slotNumber});`);
        console.log(chalk.green(`Allocated slot number: ${slotNumber}`));
    } catch(e) {
        console.log(chalk.red('Unable to park a car. Make sure parking is alloted?'));
    }
}

const leaveCar =  async (carNumber, totalHours) => {
    // Parse to integer
    const hours = parseInt(totalHours);
    if (isNaN(hours)) {
        console.log(chalk.red('Hours must be in number format'));
        return;
    }

    try {
        const carEntry = await db.select(`SELECT * FROM parking WHERE carNumber='${carNumber}'`);
        if (typeof carEntry === 'undefined') {
            console.log(chalk.red(`Registration number ${carNumber} not found`));
            return;
        }
        
        if (carEntry.isExited) {
            console.log(chalk.red('Car already exited'));
            return;
        }

        await db.query(`DELETE FROM parking WHERE carNumber='${carNumber}'`);
        console.log(chalk.green(`Registration number ${carNumber} with Slot Number ${carEntry.slotNumber} is free with Charge ${hours * 7.5}`));
    } catch(e) {
        console.log(chalk.red('Unable to unpark a car.'), e);
    }
}

const status = async () => {
    const parkedCars = await db.selectAll('SELECT * FROM parking');
    if (parkedCars.length == 0) {
        console.log(chalk.red(`Parking is empty now`));
        return;
    }

    console.log('Slot No.\tRegistration No.')

    parkedCars.forEach((car) => {
        console.log(chalk.green(`${car.slotNumber}\t\t${car.carNumber}`));
    });
}

const [cmd, arg1, arg2] = process.argv.slice(2);
if (typeof cmd != 'undefined' && !cmds.includes(cmd)) {
    console.log(chalk.red(`Invalid command: ${cmd}`));
    help();
    return;
}

switch(cmd){
    case 'create_parking_lot':
        createParkingLot(arg1);
        break;

    case 'park':
        parkCar(arg1);
        break;

    case 'leave':
        leaveCar(arg1, arg2);
        break;

    case 'status':
        status();
        break;

    default: 
        help();
}

module.exports = car;