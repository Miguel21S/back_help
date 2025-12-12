import { error } from "console";
import { Buildings } from "../../../entities/models/Buildings.models";
// import { faker } from "@faker-js/faker";

export const seederBuildings = async () => {
    const { faker } = await import("@faker-js/faker");
    for (let i = 0; i < 10; i++) {
       /*  await Buildings.create({
            // address: faker.location.streetAddress(),
            // number_build: faker.string.numeric(3),
            // last_maintenance: faker.date.past(),
            // country: faker.location.country(),
            // province: faker.location.state(),
            // city: faker.location.city(),
            // postal_code: faker.location.zipCode(),
            // build_type: faker.helpers.arrayElement(["House", "Apartment"]),
            // quantity_apartment: faker.number.int({ min: 1, max: 50 }),
            // floor_number: faker.string.numeric(2)

            address_line1: faker.location.streetAddress(),
            address_line2: faker.lorem.words(3),
            last_maintenance: faker.date.past(),
            admin_responsible: faker.person.fullName(),
            general_status: faker.helpers.arrayElement(["Active", "Inactive", "Maintenance"]),
            services_available: faker.lorem.words(3),
            photo: faker.image.urlPicsumPhotos(), // faker.image.photo() no existe
            country: faker.location.country(),
            province: faker.location.state(),
            city: faker.location.city(),
            postal_code: faker.location.zipCode(),
            build_type: faker.helpers.arrayElement(["House", "Apartment"]),
            quantity_apartment: faker.number.int({ min: 1, max: 50 }),
            floor_number: faker.number.int({ min: 1, max: 20 })
        }).save(); */

        const building = new Buildings();
        building.address_1 = faker.location.streetAddress();
        building.address_2 = faker.lorem.words(3);
        building.last_maintenance = faker.date.past().toISOString().split("T")[0];
        // building.admin_responsible = faker.person.fullName();
        building.general_status = faker.helpers.arrayElement(["Active", "Inactive", "Maintenance"]);
        building.services_available = faker.lorem.words(3);
        // building.photo = faker.image.urlPicsumPhotos(); // faker.image.photo() no existe
        building.country = faker.location.country();
        building.province = faker.location.state();
        building.city = faker.location.city();
        building.postal_code = faker.location.zipCode();
        building.build_type = faker.helpers.arrayElement(["House", "Apartment"]);
        building.quantity_apartment = faker.number.int({ min: 1, max: 50 });
        building.floor_number = faker.string.numeric(2)

        await building.save();
    }
};
