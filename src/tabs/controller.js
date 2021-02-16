import Tab from './model';

export async function create(req, res) {
	try {
		const body = req.body;

		const tab = await Tab.create({
			name: body.name,
			description: body.description,
			dataPoints: body.dataPoints,
		});

		return res.status(201).json(tab);
	} catch (err) {
		if (err.name == 'ValidationError') {
			return res.status(422).json(err);
		} else {
			return res.status(500).json({ err: err.message || 'network error' });
		}
	}
}

export async function update(req, res) {
	try {
		const tab = await Tab.findById(req.params.tabId);

		if (!tab) {
			return res.status(500).json({ err: 'could not find tab' });
		}

		const body = req.body;

		tab.name = body.name || tab.name;
		tab.description = body.description || tab.description;
		tab.dataPoints = body.dataPoints || tab.dataPoints;

		const rs = await tab.save();

		return res.status(200).json(tab);
	} catch (err) {
		return res.status(500).json({ err: err.message || 'network error' });
	}
}

export async function fetchAll(req, res) {
	try {
		const tabs = await Tab.find({});

		res.status(200).json(tabs);
	} catch (err) {
		res.status(500).json({ err: err.message || 'network error' });
	}
}

export async function remove(req, res) {
	try {
		const tab = await Tab.findById(req.params.tabId);

		if (!tab) {
			return res.status(500).json({ err: 'could not find tab' });
		}

		await tab.remove();

		return res.status(200).json({ message: 'tab deleted' });
	} catch (err) {
		return res.status(500).json({ err: err.message || 'network error' });
	}
}
