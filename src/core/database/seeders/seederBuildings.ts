import { Buildings } from "../../../entities/models/Buildings.models";
// import { faker } from "@faker-js/faker";

export const seederBuildings = async () => {
    const { faker } = await import("@faker-js/faker");
    for (let i = 0; i < 10; i++) {
        await Buildings.create({
            address: faker.location.streetAddress(),
            number_build: faker.string.numeric(3),
            country: faker.location.country(),
            province: faker.location.state(),
            city: faker.location.city(),
            postal_code: faker.location.zipCode(),
            build_type: faker.helpers.arrayElement(["House", "Apartment"]),
            quantity_apartment: faker.number.int({ min: 1, max: 50 }),
            floor_number: faker.string.numeric(2)
        }).save();
    }
};
