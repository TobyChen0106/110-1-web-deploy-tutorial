function copy(object) {
  return JSON.parse(JSON.stringify(object));
}

const Mutation = {
  async insertPeople(parent, args, { db, pubsub }, info) {
    // let inserted = [];
    let deleted = [];
    try {
      for (let i = 0; i < args.data.length; i++) {
        const person = args.data[i];
        const result = await db.People.findOne({ ssn: person.ssn });
        if (!result) {
          const new_people = await new db.People({ ...person });
          new_people.save();
        //   inserted.push(new_people);
        } else {
          const update_people = await db.People.findOneAndUpdate(
            { ssn: person.ssn },
            { ...person },
            // { new: true }
          );
        //   inserted.push(result);
          deleted.push(update_people);
        }
      }

      pubsub.publish("PEOPLE", {
        people: {
          inserted: args.data,
          deleted: deleted,
        },
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

export default Mutation;
