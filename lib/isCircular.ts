import {GeneralObject} from "./types";

const originalKey = "object";
export = <T>(object: GeneralObject<T>, searchKey?: string): boolean => {
	const keys = [];
	const stack = [];
	const stackSet = new Set();
	let detected = false;

	function detect (object: GeneralObject<any>, key: string) {
		if (object && typeof object !== "object") {
			return;
		}

		if (stackSet.has(object)) { // it's cyclic! Print the object and its locations.
			const oldIndex: number = stack.indexOf(object);
			const l1: string = keys.join(".") + "." + key;
			// const l2: string = keys.slice(0, oldIndex + 1).join(".");

			if (!searchKey || l1.replace(`${originalKey}.`, "") === searchKey) {
				detected = true;
				return;
			} else {
				return;
			}
		}

		keys.push(key);
		stack.push(object);
		stackSet.add(object);
		for (const k in object) { //dive on the object's children
			if (Object.prototype.hasOwnProperty.call(object, k)) {
				detect(object[k], k);
			}
		}

		keys.pop();
		stack.pop();
		stackSet.delete(object);
		return;
	}

	detect(object, originalKey);
	return detected;
};
