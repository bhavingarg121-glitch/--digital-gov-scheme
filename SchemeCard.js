import React from "react";

export default function SchemeCard({ scheme, onSave, onApply, isGuest }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex justify-between items-start hover:shadow-lg transition">
      {/* Scheme Info */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-indigo-700 mb-2">{scheme.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{scheme.description}</p>
        <a
          href={scheme.official_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 underline text-sm font-medium"
        >
          Official Link
        </a>
      </div>

      {/* Actions */}
      <div className="flex flex-col space-y-2 ml-4">
        {isGuest ? (
          <span className="text-gray-400 text-xs italic">
            Login to save/apply
          </span>
        ) : (
          <>
            <button
              onClick={() => onSave(scheme.scheme_id)}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm font-semibold"
            >
              Save
            </button>
            <button
              onClick={() => onApply(scheme.scheme_id)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm font-semibold"
            >
              Apply
            </button>
          </>
        )}
      </div>
    </div>
  );
}
