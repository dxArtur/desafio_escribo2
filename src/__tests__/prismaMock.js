/* eslint-disable no-undef */
const { makePrismaClientClass } = require('@prisma/client/runtime')

class PrismaMock {
	user = {
		findUnique: jest.fn(),
		findFirst: jest.fn(),
		update: jest.fn()

	}

}
  
module.exports = makePrismaClientClass(PrismaMock)
