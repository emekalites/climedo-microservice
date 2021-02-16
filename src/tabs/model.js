import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import uniqueValidator from 'mongoose-unique-validator';

const TabSchema = new Schema(
	{
		name: {
			type: String,
			index: true,
			required: [true, 'Name cannot be empty.'],
		},
		description: String,
		dataPoints: [Object],
	},
	{ collection: 'tabs' }
);

TabSchema.plugin(timestamps);

TabSchema.plugin(uniqueValidator, {
	message: '{VALUE} already taken!',
});

const Tab = mongoose.model('Tab', TabSchema);

export default Tab;
