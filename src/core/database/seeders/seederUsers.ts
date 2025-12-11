import { Users } from "../../../entities/models/Users.models";
import bcryptjs from "bcryptjs";
// import { faker } from "@faker-js/faker"

export const seederUsers = async () => {
    const { faker } = await import("@faker-js/faker");
    const superAdmin = Users.create({
        // name: "Super",
        // lastName: "Admin",
        // date_born: new Date("1990-01-01"),
        // nationality: "Spain",
        // gender: "Male".toUpperCase(),
        // special_situation: "Bien",
        // phone: "600000000",
        // email: "superadmin@gmail.com",
        // date_entry_apartment: new Date(),
        // password: await bcryptjs.hash("Superadmin.123", 10),
        // building_id: 1,
        // role_id: 1,

        name: "Super",
        lastName: "Admin",
        date_born: new Date("1990-01-01"),
        nationality: "Spain",
        gender: "Male".toUpperCase(),
        special_situation: "Bien",
        phone: "600000000",
        email: "superadmin@gmail.com",

        type_document: "DNI", // reemplazo manual
        number_document: "12345678A", // reemplazo manual
        avatar: faker.image.avatar(),
        isActive: true,
        last_login: new Date(),

        date_entry_apartment: new Date(),
        password: await bcryptjs.hash("Superadmin.123", 10),
        building_id: 1,
        role_id: 1,
    });
    await superAdmin.save();

    for (let i = 0; i < 100; i++) {

        const user = Users.create({
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            date_born: faker.date.birthdate({ min: 1950, max: 2005, mode: "year" }),
            nationality: faker.location.country(),
            gender: faker.person.sex().toUpperCase(),
            special_situation: faker.lorem.sentence(),
            phone: faker.phone.number(),
            email: faker.internet.email().toLowerCase(),

            type_document: faker.helpers.arrayElement(["DNI", "Passport", "ID Card"]),
            number_document: faker.string.alphanumeric(8).toUpperCase(),
            avatar: faker.image.avatar(),
            isActive: faker.datatype.boolean(),
            last_login: faker.date.past(),

            date_entry_apartment: faker.date.past(),
            password: await bcryptjs.hash("User123456", 10),

            building_id: faker.number.int({ min: 1, max: 10 }),
            role_id: 6
        });

        await user.save();
    }
};