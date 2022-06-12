import React from "react";

export default function getRelativePosition(e: React.MouseEvent) {
    const target = e.target as SVGElement;
    const containerBounds = target.getBoundingClientRect();

    const x = Math.round(e.clientX - containerBounds.left);
    const y = Math.round(e.clientY - containerBounds.top);

    return { x, y };
}