const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;

const dbURI = "mongodb://127.0.0.1:27017";

const database = "task6";

mongoClient.connect(dbURI, (error, results) => {
  if (error) {
    console.log("Error While Connecting to MongoDB: ", error);
    return;
  }
  const db = results.db(database);

  //TODO: insert 2 persons using insertOne method
  db.collection("users").insertOne(
    {
      name: "Mohamed",
      age: 22,
    },
    (error, data) => {
      if (error) {
        console.log("Error while inserting user: ", error);
      }
      console.log("User Inserted: ", data.insertedId);
    }
  );
  db.collection("users").insertOne(
    {
      name: "Ali",
      age: 24,
    },
    (error, data) => {
      if (error) {
        console.log("Error while inserting user: ", error);
      }
      console.log("User Inserted: ", data.insertedId);
    }
  );

  //TODO: insert 10 persons using insertMany method. half of them have the age of 25

  const names = [
    "Ahmed",
    "Khalid",
    "Yasser",
    "Amin",
    "Mona",
    "Soha",
    "Abdullah",
    "Omar",
    "Abdelrhman",
    "Mahmoud",
  ];

  const usersToAdd = [];

  for (let i = 0; i < 5; i++) {
    usersToAdd.push({ name: names[i], age: 25 });
    usersToAdd.push({ name: names[i + 4], age: 40 });
  }

  //inserting users in db
  db.collection("users").insertMany(usersToAdd, (error, data) => {
    if (error) {
      console.log(
        "Error while inserting users with insertMany method: " + error
      );
    }
    console.log("Successfully inserted : ", data.insertedCount, " users");
  });

  //TODO: find all users who are 25y old

  db.collection("users")
    .find({ age: 25 })
    .toArray((error, users) => {
      if (error) {
        return console.log("Error while retrieving users with 25y: ", error);
      }
      console.log(users);
    });

  //TODO: find only 3 users who are 25y old

  db.collection("users")
    .find({ age: 25 })
    .limit(3)
    .toArray((error, users) => {
      if (error) {
        return console.log("Error while retrieving 3 users with 25y: ", error);
      }
      console.log(users);
    });

  //TODO: Update the name of the first 4 users using $set operator

  /*
    --> 1st user
  */
  db.collection("users")
    .updateOne(
      { _id: mongodb.ObjectId("64d806b9410c39137d41faaa") }, // Note you have to change this id with the 1st person id in users collection on your local DB
      {
        $set: { name: "Monuir" },
      }
    )
    .then((results) =>
      console.log("Successfully modified", results.matchedCount, " users")
    )
    .catch((error) => console.log("Error while updating user's name: ", error));

  /*
    --> 2nd user
  */
  db.collection("users")
    .updateOne(
      { _id: mongodb.ObjectId("64d806b9410c39137d41faab") }, // Note you have to change this id with the 2nd person id in users collection on your local DB
      {
        $set: { name: "Sarah" },
      }
    )
    .then((results) =>
      console.log("Successfully modified", results.matchedCount, " users")
    )
    .catch((error) => console.log("Error while updating user's name: ", error));

  /*
    --> 3rd user
  */
  db.collection("users")
    .updateOne(
      { _id: mongodb.ObjectId("64d806b9410c39137d41faac") }, // Note you have to change this id with the 3rd person id in users collection on your local DB
      {
        $set: { name: "Tarek" },
      }
    )
    .then((results) =>
      console.log("Successfully modified", results.matchedCount, " users")
    )
    .catch((error) => console.log("Error while updating user's name: ", error));

  /*
    --> 4th user
  */
  db.collection("users")
    .updateOne(
      { _id: mongodb.ObjectId("64d806b9410c39137d41faad") }, // Note you have to change this id with the 4th person id in users collection on your local DB
      {
        $set: { name: "Amer" },
      }
    )
    .then((results) =>
      console.log("Successfully modified", results.matchedCount, " users")
    )
    .catch((error) => console.log("Error while updating user's name: ", error));

  // TODO: Update the age of the first person to increase his age by 20

  db.collection("users")
    .updateOne(
      {},
      { $inc: { age: 20 } },
      { sort: { _id: 1 } } // Sort by _id in ascending order (first document) to get the first user and update it
    )
    .then((result) => {
      if (result.matchedCount === 1) {
        console.log("Successfully updated the age of the first person.");
      } else {
        console.log("No user found to update.");
      }
    })
    .catch((error) => console.log("Error while updating the age: ", error));

  // TODO: Update the age of all users by increasing it by 10
  db.collection("users")
    .updateMany(
      {},
      {
        $inc: { age: 10 },
      }
    )
    .then((results) => {
      console.log("Successfully modified", results.matchedCount, " users");
    })
    .catch((error) => console.log("Error while updating users' ages: ", error));

  //TODO: Delete the first person

  db.collection("users")
    .findOneAndDelete({}, { sort: { _id: 1 } }) // Sort by _id in ascending order (first document)
    .then((result) => {
      if (result.value) {
        console.log("Successfully deleted user:", result.value.name);
      } else {
        console.log("No user found to delete.");
      }
    })
    .catch((error) =>
      console.log("Error while deleting the first user: ", error)
    );

  //TODO: Delete all users who are 35y old

  db.collection("users")
    .deleteMany({ age: 35 })
    .then((results) => {
      console.log("Successfully deleted ", results.deletedCount, " users");
    })
    .catch((error) =>
      console.log("Error while deleting all users who are 35y old: ", error)
    );
});
