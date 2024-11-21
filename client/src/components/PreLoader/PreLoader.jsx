import React, { useState, useEffect } from "react";
import "./PreLoader.css";

const EntryLoader = ({ onFinish }) => {
  const [loading, setLoading] = useState(true);
  const [breakApart, setBreakApart] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  const [zoomFinished, setZoomFinished] = useState(false); // New state to hide loader

  useEffect(() => {
    // Initial loading phase
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      setBreakApart(true);
    }, 2000); // Adjust time for the loading duration

    // Break apart phase
    const breakTimeout = setTimeout(() => {
      setBreakApart(false);
      setZoomIn(true);
    }, 3000); // Adjust time for break apart duration

    // Finish zoom in and reveal main content
    const zoomTimeout = setTimeout(() => {
      setZoomFinished(true); // Mark zoom as finished
      onFinish();
    }, 4500); // Adjust time for zoom in duration

    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(breakTimeout);
      clearTimeout(zoomTimeout);
    };
  }, [onFinish]);

  return (
    <div
      className={`ENTRY-entry-loader ${zoomFinished ? "zoom-finished" : ""}`}
    >
      {loading && <div className="ENTRY-loader loading">Auction X</div>}
      {breakApart && (
        <div className="ENTRY-loader ENTRY-break">
          <div className="ENTRY-piece ENTRY-piece1">A</div>
          <div className="ENTRY-piece ENTRY-piece2">u</div>
          <div className="ENTRY-piece ENTRY-piece3">c</div>
          <div className="ENTRY-piece ENTRY-piece4">t</div>
          <div className="ENTRY-piece ENTRY-piece5">i</div>
          <div className="ENTRY-piece ENTRY-piece6">o</div>
          <div className="ENTRY-piece ENTRY-piece7">n</div>
          <div className="ENTRY-piece ENTRY-piece8">X</div> {/* New piece */}
        </div>
      )}
      {zoomIn && <div className="ENTRY-loader ENTRY-zoom">Auction X</div>}
    </div>
  );
};

export default EntryLoader;
