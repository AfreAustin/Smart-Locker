import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const databaseRouter = express.Router();
databaseRouter.use(express.json());

// ------------ Accounts ------------

// get accounts collection
databaseRouter.get("/manage/accounts", async (_req, res) => {
    try {
        // pass collection into empty object, convert cursor to array
        const accounts = await collections.accounts.find({}).toArray();
        res.status(200).send(accounts);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get one account
databaseRouter.get("/manage/accounts/:id", async (req, res) => {
    try {
        // convert string _id into ObjectID 
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        
        // get account using id
        const account = await collections.accounts.findOne(query);
        if (account) {
            res.status(200).send(account);
        } else {
            res.status(404).send(`Failed to find an account: id ${id}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find an account: id ${req?.params?.id}`);
    }
});

// create new account
databaseRouter.post("/manage/accounts", async (req, res) => {
    try {
        // get account details from client request
        const account = req.body;

        // insert account into database
        const result = await collections.accounts.insertOne(account);
        if (result.acknowledged) {
            res.status(201).send(`Created a new account: id ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new account.");
        }

    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// update existing account
databaseRouter.put("/manage/accounts/:id", async (req, res) => {
    try {
        // query database for account and get account details from client request
        const id = req?.params?.id;
        const account = req.body;
        const query = { _id: new mongodb.ObjectId(id) };

        // update account in database
        const result = await collections.accounts.updateOne(query, { $set: account });
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an account: id ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an account: id ${id}`);
        } else {
            res.status(304).send(`Failed to update an account: id ${id}`);
        }

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// delete existing account
databaseRouter.delete("/manage/accounts/:id", async (req, res) => {
    try {
        // query database for account
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        
        // delete account from database
        const result = await collections.accounts.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an account: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an account: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an account: ID ${id}`);
        }

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// ------------ Items ------------

// get items collection
databaseRouter.get("/manage/items", async (_req, res) => {
    try {
        // pass collection into empty object, convert cursor to array
        const items = await collections.items.find({}).toArray();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get one item
databaseRouter.get("/manage/items/:id", async (req, res) => {
    try {
        // convert string _id into ObjectID 
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        
        // get item using id
        const item = await collections.items.findOne(query);
        if (item) {
            res.status(200).send(item);
        } else {
            res.status(404).send(`Failed to find an item: id ${id}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find an item: id ${req?.params?.id}`);
    }
});

// create new item
databaseRouter.post("/manage/items", async (req, res) => {
    try {
        // get item details from client request
        const item = req.body;

        // insert item into database
        const result = await collections.items.insertOne(item);
        if (result.acknowledged) {
            res.status(201).send(`Created a new item: id ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new item.");
        }

    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// update existing item
databaseRouter.put("/manage/items/:id", async (req, res) => {
    try {
        // query database for item and get item details from client request
        const id = req?.params?.id;
        const item = req.body;
        const query = { _id: new mongodb.ObjectId(id) };

        // update item in database
        const result = await collections.items.updateOne(query, { $set: item });
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an item: id ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an item: id ${id}`);
        } else {
            res.status(304).send(`Failed to update an item: id ${id}`);
        }

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// delete existing item
databaseRouter.delete("/manage/items/:id", async (req, res) => {
    try {
        // query database for item
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        
        // delete item from database
        const result = await collections.items.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an item: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an item: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an item: ID ${id}`);
        }

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// ------------ Lockers ------------

// get lockers collection
databaseRouter.get("/manage/lockers", async (_req, res) => {
    try {
        // pass collection into empty object, convert cursor to array
        const lockers = await collections.lockers.find({}).toArray();
        res.status(200).send(lockers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get one locker
databaseRouter.get("/manage/lockers/:id", async (req, res) => {
    try {
        // convert string _id into ObjectID 
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        
        // get locker using id
        const locker = await collections.lockers.findOne(query);
        if (locker) {
            res.status(200).send(locker);
        } else {
            res.status(404).send(`Failed to find a locker: id ${id}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find a locker: id ${req?.params?.id}`);
    }
});

// create new locker
databaseRouter.post("/manage/lockers", async (req, res) => {
    try {
        // get locker details from client request
        const locker = req.body;

        // insert locker into database
        const result = await collections.lockers.insertOne(locker);
        if (result.acknowledged) {
            res.status(201).send(`Created a new locker: id ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new locker.");
        }

    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// update existing locker
databaseRouter.put("/manage/lockers/:id", async (req, res) => {
    try {
        // query database for locker and get locker details from client request
        const id = req?.params?.id;
        const locker = req.body;
        const query = { _id: new mongodb.ObjectId(id) };

        // update locker in database
        const result = await collections.lockers.updateOne(query, { $set: locker });
        if (result && result.matchedCount) {
            res.status(200).send(`Updated a locker: id ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find a locker: id ${id}`);
        } else {
            res.status(304).send(`Failed to update a locker: id ${id}`);
        }

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// delete existing locker
databaseRouter.delete("/manage/lockers/:id", async (req, res) => {
    try {
        // query database for locker
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        
        // delete locker from database
        const result = await collections.lockers.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Removed a locker: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a locker: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a locker: ID ${id}`);
        }

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// ------------ Reservations ------------

// get reservations collection
databaseRouter.get("/manage/reservations", async (_req, res) => {
    try {
        // pass collection into empty object, convert cursor to array
        const reservations = await collections.reservations.find({}).toArray();
        res.status(200).send(reservations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get one reservation
databaseRouter.get("/manage/reservations/:id", async (req, res) => {
    try {
        // convert string _id into ObjectID 
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        
        // get reservation using id
        const reservation = await collections.reservations.findOne(query);
        if (reservation) {
            res.status(200).send(reservation);
        } else {
            res.status(404).send(`Failed to find a reservation: id ${id}`);
        }

    } catch (error) {
        res.status(404).send(`Failed to find a reservation: id ${req?.params?.id}`);
    }
});

// create new reservation
databaseRouter.post("/manage/reservations", async (req, res) => {
    try {
        // get reservation details from client request
        const reservation = req.body;

        // insert reservation into database
        const result = await collections.reservations.insertOne(reservation);
        if (result.acknowledged) {
            res.status(201).send(`Created a new reservation: id ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new reservation.");
        }

    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// update existing reservation
databaseRouter.put("/manage/reservations/:id", async (req, res) => {
    try {
        // query database for reservation and get reservation details from client request
        const id = req?.params?.id;
        const reservation = req.body;
        const query = { _id: new mongodb.ObjectId(id) };

        // update reservation in database
        const result = await collections.reservations.updateOne(query, { $set: reservation });
        if (result && result.matchedCount) {
            res.status(200).send(`Updated a reservation: id ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find a reservation: id ${id}`);
        } else {
            res.status(304).send(`Failed to update a reservation: id ${id}`);
        }

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// delete existing reservation
databaseRouter.delete("/manage/reservations/:id", async (req, res) => {
    try {
        // query database for reservation
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        
        // delete reservation from database
        const result = await collections.reservations.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Removed a reservation: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a reservation: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a reservation: ID ${id}`);
        }

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
