"use client";

import React, { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";

/** Type definitions to match backend responses
 *
 */
interface Module {
    id: number;
    title: string;
}
interface Unit {
    id: number;
    name: string;
}
interface Location {
    id: number;
    name: string;
}

/** Type definitions to match select options
 *
 */
interface SelectOption {
    value: number;
    label: string;
}

export default function Home() {
    // --- State to hold fetched data*/
    const [modules, setModules] = useState<Module[]>([]);
    const [units, setUnits] = useState<Unit[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);

    // --- State to hold user selections ---
    const [selectedModuleIds, setSelectedModuleIds] = useState<number[]>([]);
    const [selectedUnitIds, setSelectedUnitIds] = useState<number[]>([]);
    const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);

    // Fetch MODULES on mount
    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:3001/api/filters/modules");
            const data = await res.json();
            setModules(data.modules || []);
        })();
    }, [selectedUnitIds, selectedLocationIds]);

    // Fetch UNITS on mount
    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:3001/api/filters/units");
            const data = await res.json();
            setUnits(data.units || []);
        })();
    }, [selectedModuleIds, selectedLocationIds]);

    // Fetch LOCATIONS on mount
    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:3001/api/filters/locations");
            const data = await res.json();
            setLocations(data.locations || []);
        })();
    }, [selectedModuleIds, selectedUnitIds]);

    // Convert modules into react-select options
    const moduleOptions = modules.map((m) => ({
        value: m.id,
        label: m.title,
    }));
    // Convert unit into react-select options
    const unitOptions = units.map((u) => ({
        value: u.id,
        label: u.name,
    }));
    // Convert locations into react-select options
    const locationOptions = locations.map((l) => ({
        value: l.id,
        label: l.name,
    }));

    // Handler for multi-select changes in modules
    const handleChangeSelectedModules = (options: MultiValue<SelectOption>) => {
        const ids = options.map((opt) => opt.value);
        setSelectedModuleIds(ids);
    };

    // Handler for multi-select changes in units
    const handleChangeSelectedUnits = (options: MultiValue<SelectOption>) => {
        const ids = options.map((opt) => opt.value);
        setSelectedUnitIds(ids);
    };

    // Handler for multi-select changes in locations
    const handleChangeSelectedLocations = (options: MultiValue<SelectOption>) => {
        const ids = options.map((opt) => opt.value);
        setSelectedLocationIds(ids);
    };

    // Apply filters
    const handleApplyFilters = () => {
        console.log("Applying filters...");
        console.log("Selected Module IDs: ", selectedModuleIds);
        console.log("Selected Unit IDs: ", selectedUnitIds);
        console.log("Selected Location IDs: ", selectedLocationIds);
    };

    // Reset all filters
    const resetFilters = () => {
        setSelectedModuleIds([]);
        setSelectedUnitIds([]);
        setSelectedLocationIds([]);
    };

    // --- Render UI ---
    return (
        <div className="p-4">
            <h3 className="text-2xl font-bold">Filters</h3>

            {/* select modules */}
            <h5 className="text-sm font-semibold">Modules:</h5>
            <Select
                className="text-black"
                isMulti
                instanceId="modules-select"
                options={moduleOptions}
                onChange={handleChangeSelectedModules}
                value={moduleOptions.filter((option) => selectedModuleIds.includes(option.value))}
            />

            {/* select units */}
            <h5 className="text-sm font-semibold">Units:</h5>
            <Select
                className="text-black"
                isMulti
                instanceId="units-select"
                options={unitOptions}
                onChange={handleChangeSelectedUnits}
                value={unitOptions.filter((option) => selectedUnitIds.includes(option.value))}
            />

            {/* select locations */}
            <h5 className="text-sm font-semibold">Locations:</h5>
            <Select
                className="text-black"
                isMulti
                instanceId="units-select"
                options={locationOptions}
                onChange={handleChangeSelectedLocations}
                value={locationOptions.filter((option) => selectedLocationIds.includes(option.value))}
            />

            {/* Apply & Reset */}
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold m-2 py-2 px-4 rounded" onClick={handleApplyFilters}>
                apply
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded" onClick={resetFilters}>
                reset
            </button>
        </div>
    );
}

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
