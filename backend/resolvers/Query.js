const Query = {
    async statsCount(parent, args, { db }, info) {
        let result = [];
        try {
            if (args.severity) {
                // result = result.filter((person) => person.severity >= args.severity);
                result =  await db.People.find({severity:{ $gte: args.severity }});
            }else{
                result =  await db.People.find();
            }
            result = result.filter((person) => 
                args.locationKeywords.some(
                    (keyword) => person.location.description.includes(keyword)
                )
            );
            return args.locationKeywords.map(
                (keyword) => result.filter(
                    (person) => person.location.description.includes(keyword)
                ).length
            );
        } catch (err) {
            return null;
        }
    },
}

export default Query;
