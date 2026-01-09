import cron from 'node-cron';

import { inactiveActivateUsers } from '../entities/services/Admin_Module/users.services';

cron.schedule("*/1 * * * *", async () => {
    try {
        console.log("Running inactive users job...");
        await inactiveActivateUsers();
    } catch (error) {
        console.error("Error in inactive users job", error);
    }
});