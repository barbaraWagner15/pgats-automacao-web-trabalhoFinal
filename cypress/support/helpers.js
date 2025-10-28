import { faker } from '@faker-js/faker'

export function getRandomNumber(){
    return faker.number.hex({ min: 10000, max: 99999 })
}

export function getRandomEmail(){
return faker.internet.email({ firstName: 'QATester' })
}


