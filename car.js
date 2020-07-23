function Car() {
    this.slots = [];
    this.parking = [];
    this.cmds = ['create_parking_lot','park', 'leave','status']; // Available commands

    // Commands args and description
    this.cmdInfo = {
        create_parking_lot: {args: 'capacity', desc: 'Create parking lot of size n'},
        park: {args: 'car_number', desc: 'Park a car'},
        leave: {args: ['car_number', 'hours'], desc: 'Unpark a car'},
        status: {desc: 'Print status of parking slot'}
    }

    // Commands help
    this.help = () => {
        let msg = 'Available commands:\n'
        this.cmds.forEach(cmd => {
            const argTabs = cmd === 'create_parking_lot' ? '\t' : '\t\t\t';
            const descTabs = cmd === 'leave' ? '\t': cmd === 'status' ? '\t\t\t' : '\t\t';

            const {args, desc} = this.cmdInfo[cmd]; // Extract args and description

            // Preparing cli command
            msg += `\t${cmd}${argTabs} ${
                typeof args !== 'undefined' 
                ? `{${typeof args == 'object' ? args.join('} {') : args}}`
                : '' 
            } ${descTabs} ${desc}\n`;
        });

        return msg;
    }

    this.createParkingLot = (capacity) => {
        if (typeof capacity === 'undefined') { // If capacity not provided
            return 'Capacity is required';
        }

        const cap = parseInt(capacity); // Parse to integer
        if (isNaN(cap)) {
            return 'Capacity must be in number format';
        }

        this.slots = Array.from(Array(cap), (_, i) => i + 1);
        return `Created parking lot with ${cap} slots`;
    }

    this.parkCar = (carNumber) => {
        if (this.slots.length === 0) {
            return 'Unable to park a car. Make sure parking is alloted?';
        }

        const parkedSlot = this.parking.filter((item) => item != null).map(i => i.slotNumber); // Get how many cars parked already in parking

        // If parking full
        if (parkedSlot.length === this.slots.length) {
            return 'Sorry, parking lot is full';
        }
        
        // Filter to check duplicate car entry
        const checkCar = this.parking.filter(item => item != null && item.carNumber == carNumber).length;
        if (checkCar) {
            return `Duplicate entry for parked car ${carNumber}.`;
        }

        const availableSlots = this.slots.filter(s => !parkedSlot.includes(s)); // Find available slots
        const slotNumber = availableSlots[0]; // Slot number

        // Park a car
        this.parking.push({carNumber, slotNumber});
        return `Allocated slot number: ${slotNumber}`;
    }

    this.leaveCar = (carNumber, totalHours) => {
        // Parse to integer
        const hours = parseInt(totalHours);
        if (isNaN(hours)) {
            return 'Hours must be in number format';        }

        const carEntry = this.parking.filter(item => item != null && item.carNumber === carNumber);
        if (carEntry.length === 0) {
            return `Registration number ${carNumber} not found`;
        }

        // Charges
        const charges = Math.round(hours > 4 ? hours * 8.33 : hours * 7.5);
        
        this.parking = this.parking.filter(item => item != null && item.carNumber != carNumber); // Remove car
        return `Registration number ${carNumber} with Slot Number ${carEntry[0].slotNumber} is free with Charge ${charges}`;
    }

    this.status = () => {
        this.parking.sort((a, b) => {
            return a.slotNumber > b.slotNumber ? 1 : -1;
        });

        let msg = 'Slot No.\tRegistration No.\n';

        this.parking.forEach(item => {
            msg = `${msg}${item.slotNumber}\t\t${item.carNumber}\n`;
        });

        return msg;
    }
}

module.exports = Car;