'use strict'

const Car = require('./car')
const expect = require('chai').expect
  
const car = new Car();

describe('create_parking_lot 6', () => {
  const expectedResult = 'Created parking lot with 6 slots';
  it(expectedResult, () => {
    const result = car.createParkingLot(6);
    expect(result).to.be.string(expectedResult)
  })
});

describe('park KA-01-HH-1234', () => {
  const expectedResult = 'Allocated slot number: 1';
  it(expectedResult, () => {
    const result = car.parkCar('KA-01-HH-1234');
    expect(result).to.be.string(expectedResult);
  });
});

describe('park KA-01-HH-9999', () => {
  const expectedResult = 'Allocated slot number: 2';
  it(expectedResult, () => {
    const result = car.parkCar('KA-01-HH-9999');
    expect(result).to.be.string(expectedResult);
  });
});

describe('park KA-01-BB-0001', () => {
  const expectedResult = 'Allocated slot number: 3';
  it(expectedResult, () => {
    const result = car.parkCar('KA-01-BB-0001');
    expect(result).to.be.string(expectedResult);
  });
});

describe('park KA-01-HH-7777', () => {
  const expectedResult = 'Allocated slot number: 4';
  it(expectedResult, () => {
    const result = car.parkCar('KA-01-HH-7777');
    expect(result).to.be.string(expectedResult);
  });
});

describe('park KA-01-HH-2701', () => {
  const expectedResult = 'Allocated slot number: 5';
  it(expectedResult, () => {
    const result = car.parkCar('KA-01-HH-2701');
    expect(result).to.be.string(expectedResult);
  });
});

describe('park KA-01-HH-3141', () => {
  const expectedResult = 'Allocated slot number: 6';
  it(expectedResult, () => {
    const result = car.parkCar('KA-01-HH-3141');
    expect(result).to.be.string(expectedResult);
  });
});

describe('leave KA-01-HH-3141 4', () => {
  const expectedResult = 'Registration number KA-01-HH-3141 with Slot Number 6 is free with Charge 30';
  it(expectedResult, () => {
    const result = car.leaveCar('KA-01-HH-3141', 4);
    expect(result).to.be.string(expectedResult);
  });
});

describe('status', () => {
  const expectedResult = 'Slot No.\tRegistration No.\n1\t\tKA-01-HH-1234\n2\t\tKA-01-HH-9999\n3\t\tKA-01-BB-0001\n4\t\tKA-01-HH-7777\n5\t\tKA-01-HH-2701';
  it(expectedResult, () => {
    const result = car.status();
    expect(result).to.be.string(expectedResult);
  });
});

describe('park KA-01-P-333', () => {
  const expectedResult = 'Allocated slot number: 6';
  it(expectedResult, () => {
    const result = car.parkCar('KA-01-P-333');
    expect(result).to.be.string(expectedResult);
  });
});

describe('park DL-12-AA-9999', () => {
  const expectedResult = 'Sorry, parking lot is full';
  it(expectedResult, () => {
    const result = car.parkCar('DL-12-AA-9999');
    expect(result).to.be.string(expectedResult);
  });
});

describe('leave KA-01-HH-1234 4', () => {
  const expectedResult = 'Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge 30';
  it(expectedResult, () => {
    const result = car.leaveCar('KA-01-HH-1234', 4);
    expect(result).to.be.string(expectedResult);
  });
});

describe('leave KA-01-BB-0001 6', () => {
  const expectedResult = 'Registration number KA-01-BB-0001 with Slot Number 3 is free with Charge 50';
  it(expectedResult, () => {
    const result = car.leaveCar('KA-01-BB-0001', 6);
    expect(result).to.be.string(expectedResult);
  });
});

describe('leave DL-12-AA-9999 2', () => {
  const expectedResult = 'Registration number DL-12-AA-9999 not found';
  it(expectedResult, () => {
    const result = car.leaveCar('DL-12-AA-9999', 2);
    expect(result).to.be.string(expectedResult);
  });
});

describe('park KA-09-HH-0987', () => {
  const expectedResult = 'Allocated slot number: 1';
  it(expectedResult, () => {
    const result = car.parkCar('KA-09-HH-0987');
    expect(result).to.be.string(expectedResult);
  });
});

describe('park CA-09-IO-1111', () => {
  const expectedResult = 'Allocated slot number: 3';
  it(expectedResult, () => {
    const result = car.parkCar('CA-09-IO-1111');
    expect(result).to.be.string(expectedResult);
  });
});

describe('park KA-09-HH-0123', () => {
  const expectedResult = 'Sorry, parking lot is full';
  it(expectedResult, () => {
    const result = car.parkCar('KA-09-HH-0123');
    expect(result).to.be.string(expectedResult);
  });
});

describe('status', () => {
  const expectedResult = 'Slot No.\tRegistration No.\n1\t\tKA-09-HH-0987\n2\t\tKA-01-HH-9999\n3\t\tCA-09-IO-1111\n4\t\tKA-01-HH-7777\n5\t\tKA-01-HH-2701\n6\t\tKA-01-P-333';
  it(expectedResult, () => {
    const result = car.status();
    expect(result).to.be.string(expectedResult);
  });
});
