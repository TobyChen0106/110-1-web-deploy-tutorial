const Subscription = {
  people: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator("PEOPLE");
    },
  },
};

export default Subscription;
