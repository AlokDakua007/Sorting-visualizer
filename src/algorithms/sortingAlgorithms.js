// Bubble Sort
export const bubbleSort = (arr) => {
  const animations = [];
  const array = [...arr];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      animations.push([j, j + 1, "compare"]);
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1, "swap"]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return animations;
};

// Selection Sort
export const selectionSort = (arr) => {
  const animations = [];
  const array = [...arr];
  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      animations.push([j, minIdx, "compare"]);
      if (array[j] < array[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      animations.push([i, minIdx, "swap"]);
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }
  }
  return animations;
};

// Insertion Sort
export const insertionSort = (arr) => {
  const animations = [];
  const array = [...arr];
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      animations.push([j, j + 1, "compare"]);
      animations.push([j + 1, j, "swap"]);
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }
  return animations;
};

// Merge Sort
export const mergeSort = (arr) => {
  const animations = [];
  const array = [...arr];

  const merge = (start, mid, end) => {
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);
    let i = 0,
      j = 0,
      k = start;
    while (i < left.length && j < right.length) {
      animations.push([k, k, "compare"]);
      if (left[i] <= right[j]) {
        animations.push([k, left[i], "overwrite"]);
        array[k++] = left[i++];
      } else {
        animations.push([k, right[j], "overwrite"]);
        array[k++] = right[j++];
      }
    }
    while (i < left.length) {
      animations.push([k, left[i], "overwrite"]);
      array[k++] = left[i++];
    }
    while (j < right.length) {
      animations.push([k, right[j], "overwrite"]);
      array[k++] = right[j++];
    }
  };

  const mergeSortHelper = (start, end) => {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(start, mid);
    mergeSortHelper(mid + 1, end);
    merge(start, mid, end);
  };

  mergeSortHelper(0, array.length - 1);
  return animations;
};

// Quick Sort
export const quickSort = (arr) => {
  const animations = [];
  const array = [...arr];

  const partition = (low, high) => {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      animations.push([j, high, "compare"]);
      if (array[j] <= pivot) {
        i++;
        animations.push([i, j, "swap"]);
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    animations.push([i + 1, high, "swap"]);
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
  };

  const quickSortHelper = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  };

  quickSortHelper(0, array.length - 1);
  return animations;
};
