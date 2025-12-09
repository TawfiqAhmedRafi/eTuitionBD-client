import React from "react";

const SectionHeader = ({ title, subtitle, right }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold outfit">{title}</h2>
        {subtitle && <p className="text-sm text-neutral-content mt-1">{subtitle}</p>}
      </div>
      {right && <div>{right}</div>}
    </div>
  );
};

export default SectionHeader;