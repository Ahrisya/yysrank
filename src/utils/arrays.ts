const isContained = (left: any[], right: any[]) => {
    let leftIndex = 0, rightIndex = 0;
    left = left.sort(), right = right.sort();
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] > right[rightIndex]) {
            rightIndex++;
        } else if (left[leftIndex] == right[rightIndex]) {
            leftIndex++;
            rightIndex++;
        } else {
            return false;
        }
    }
    if (leftIndex === left.length) {
        return true;
    }
    return false;
};

export default isContained;
