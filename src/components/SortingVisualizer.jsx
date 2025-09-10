import React, { useState, useEffect, useRef } from "react";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
} from "../algorithms/sortingAlgorithms.js";
import "./SortingVisualizer.css";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(40);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [isSorting, setIsSorting] = useState(false);
  const isSortingRef = useRef(false); // ref to control animation
  const [barColors, setBarColors] = useState([]);

  const currentStep = useRef(0);
  const animationsRef = useRef([]);

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  const generateArray = () => {
    const arr = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 300) + 10
    );
    setArray(arr);
    setBarColors(new Array(arr.length).fill("red"));
    setIsSorting(false);
    isSortingRef.current = false;
    currentStep.current = 0;
    animationsRef.current = [];
  };

  const getAnimations = () => {
    switch (algorithm) {
      case "bubble":
        return bubbleSort(array);
      case "selection":
        return selectionSort(array);
      case "insertion":
        return insertionSort(array);
      case "merge":
        return mergeSort(array);
      case "quick":
        return quickSort(array);
      default:
        return bubbleSort(array);
    }
  };

  const runSort = () => {
    animationsRef.current = getAnimations();
    currentStep.current = 0;
    setIsSorting(true);
    isSortingRef.current = true;
    const arr = [...array];

    const animate = () => {
      if (!isSortingRef.current) return; // stop check

      if (currentStep.current >= animationsRef.current.length) {
        setIsSorting(false);
        isSortingRef.current = false;
        setBarColors(new Array(array.length).fill("green"));
        setArray(arr);
        return;
      }

      const [i, j, type] = animationsRef.current[currentStep.current];
      const newColors = [...barColors];

      if (type === "compare") {
        newColors[i] = "yellow";
        if (j !== undefined) newColors[j] = "yellow";
        setBarColors(newColors);
      } else if (type === "swap") {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        newColors[i] = "red";
        newColors[j] = "red";
        setArray([...arr]);
        setBarColors(newColors);
      } else if (type === "overwrite") {
        arr[i] = j;
        newColors[i] = "red";
        setArray([...arr]);
        setBarColors(newColors);
      }

      setTimeout(() => {
        const resetColors = [...newColors];
        resetColors[i] = "blue";
        if (j !== undefined && type !== "overwrite") resetColors[j] = "blue";
        setBarColors(resetColors);

        currentStep.current++;
        animate();
      }, 510 - speed * 5);
    };

    animate();
  };

  const stopSort = () => {
    setIsSorting(false);
    isSortingRef.current = false; // stop recursion
    currentStep.current = 0;
    setBarColors(new Array(array.length).fill("steelblue"));
  };

  return (
    <div className="container">
      <h1>Sorting Visualizer</h1>

      <div className="bar-container">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="bar"
            style={{
              height: `${value}px`,
              backgroundColor: barColors[idx],
            }}
          />
        ))}
      </div>

      <div className="buttons">
        <button onClick={generateArray} disabled={isSorting}>
          Generate New Array
        </button>

        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isSorting}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
        </select>

        {!isSorting && <button onClick={runSort}>Start Sorting</button>}
        {isSorting && <button onClick={stopSort}>Stop</button>}
      </div>

      <div className="controls">
        <label>Speed: </label>
        <input
          type="range"
          min="1"
          max="100"
          step="1"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isSorting}
        />
      </div>
      <div className="speed-labels">
        <span>Slow</span>
        <span>Fast</span>
      </div>

      <div className="controls">
        <label>Array Size: </label>
        <input
          type="range"
          min="10"
          max="150"
          step="5"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          disabled={isSorting}
        />
        <span>{arraySize}</span>
      </div>
    </div>
  );
};

export default SortingVisualizer;
