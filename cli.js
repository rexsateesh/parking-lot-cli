const Car = require('./car');
const car = new Car();

const cmds = ['create_parking_lot','park', 'leave','status']; // Available commands

// Commands info for printing
const cmdInfo = {
    create_parking_lot: {args: 'capacity', desc: 'Create parking lot of size n'},
    park: {args: 'car_number', desc: 'Park a car'},
    leave: {args: ['car_number', 'hours'], desc: 'Unpark a car'},
    status: {desc: 'Print status of parking slot'}
}

// Commands help
const help = () => {
    let msg = 'Available commands:\n'
    cmds.forEach(cmd => {
        const argTabs = cmd === 'create_parking_lot' ? '\t' : '\t\t\t';
        const descTabs = cmd === 'leave' ? '\t': cmd === 'status' ? '\t\t\t' : '\t\t';

        const {args, desc} = cmdInfo[cmd]; // Extract args and description

        // Preparing cli command
        msg += `\t${cmd}${argTabs} ${
            typeof args !== 'undefined' 
            ? `{${typeof args == 'object' ? args.join('} {') : args}}`
            : '' 
        } ${descTabs} ${desc}\n`;
    });

    return msg;
}

const [cmd, arg1, arg2] = process.argv.slice(2);
if (typeof cmd != 'undefined' && !cmds.includes(cmd)) {
    let msg = `Invalid command: ${cmd}`;
        msg += help();

    return msg;
}

switch(cmd){
    case 'create_parking_lot':
        console.log(car.createParkingLot(arg1));

    case 'park':
        console.log(car.parkCar(arg1));

    case 'leave':
        console.log(car.leaveCar(arg1, arg2));

    case 'status':
        console.log(car.status());

    default: 
        console.log(help());
}