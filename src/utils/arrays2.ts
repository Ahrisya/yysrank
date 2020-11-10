const isIntersected = (left: any[], right: any[]) => {
    let leftIndex = 0, rightIndex = 0;
    left = left.sort(), right = right.sort();
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] > right[rightIndex]) {
            rightIndex++;
        } else if (left[leftIndex] == right[rightIndex]) {
            return true
        } else {
            leftIndex++;
        }
    }
    return false;
};

export default isIntersected;