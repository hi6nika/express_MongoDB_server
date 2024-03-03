const Item = require("../mongoose/models/item");

exports.addItem = async (data) => {
  const item = await Item.create(data);

  return item;
};


exports.getMyItems = async (data) => {
  const item = await Item.find({ owner: data }).lean();

  return item;
};


exports.getAllItems = async (data) => {
  if (!data) {
    return await Item.find().lean();
  } else {
    return await Item.find(JSON.parse(data)).lean();
  }
};

exports.getItem = async (id) => {
  const item = await Item.findById(id).lean();

  return item;
};

exports.updateItemViews = async (id) => {
  const item = await Item.findById(id).lean();

  const newValue = item.views + 1;

  const updatedItem = await Item.findByIdAndUpdate(id, { views: newValue });

  return updatedItem;
};

exports.addBuyerToItem = async (id, buyerDetails) => {
  const item = await Item.findById(id).lean();

  const alreadyBought = [];

  for ([key, values] of Object.entries(item.buyers)) {
    alreadyBought.push(values._id);
  }

  if (!alreadyBought.includes(buyerDetails._id)) {
    item.buyers.push(buyerDetails);
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { buyers: item.buyers },
      { new: true }
    );

    return updatedItem;
  } else {
    throw new Error("User already bought the item!");
  }
};

exports.deleteItem = async (id) => {
  const item = await Item.findByIdAndDelete(id).lean();

  return item;
};

exports.editItem = async (id, data) => {
  const item = await Item.findByIdAndUpdate(id, data);
  return item;
};
