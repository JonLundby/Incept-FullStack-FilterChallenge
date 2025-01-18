"use client";

import React, { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";

/** Type definitions to match backend responses */
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

/** Type definitions to match select options */
interface SelectOption {
    value: number;
    label: string;
}

export default function Home() {
    // --- State to hold fetched data */
    const [modules, setModules] = useState<Module[]>([]);
    const [units, setUnits] = useState<Unit[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);

    // --- State to hold user selections ---
    const [selectedModuleIds, setSelectedModuleIds] = useState<number[]>([]);
    const [selectedUnitIds, setSelectedUnitIds] = useState<number[]>([]);
    const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);

    // --- State to hold validation result ---
    const [isValid, setIsValid] = useState<boolean>(false);

    // --- State to handle loading and errors ---
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Helper function to build query strings
    const buildQuery = (params: { [key: string]: number[] }) => {
        const query = Object.entries(params)
            .filter(([values]) => values.length > 0)
            .map(([key, values]) => `${key}=${values.join(",")}`)
            .join("&");
        return query ? `?${query}` : "";
    };

    // Fetch MODULES whenever selectedUnitIds or selectedLocationIds change
    useEffect(() => {
        const fetchModules = async () => {
            setLoading(true);
            setError(null);
            try {
                const query = buildQuery({ unitIds: selectedUnitIds, locationIds: selectedLocationIds });

                const res = await fetch(`http://localhost:3001/api/filters/modules${query}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch modules");
                }
                const data = await res.json();
                setModules(data.modules || []);
            } catch (err) {
                console.error(err);
                setError("Error fetching modules");
            } finally {
                setLoading(false);
            }
        };
        fetchModules();
    }, [selectedUnitIds, selectedLocationIds]);

    // Fetch UNITS whenever selectedModuleIds or selectedLocationIds change
    useEffect(() => {
        const fetchUnits = async () => {
            setLoading(true);
            setError(null);
            try {
                const query = buildQuery({ moduleIds: selectedModuleIds, locationIds: selectedLocationIds });
                const res = await fetch(`http://localhost:3001/api/filters/units${query}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch units");
                }
                const data = await res.json();
                setUnits(data.units || []);
            } catch (err) {
                console.error(err);
                setError("Error fetching units");
            } finally {
                setLoading(false);
            }
        };
        fetchUnits();
    }, [selectedModuleIds, selectedLocationIds]);

    // Fetch LOCATIONS whenever selectedModuleIds or selectedUnitIds change
    useEffect(() => {
        const fetchLocations = async () => {
            setLoading(true);
            setError(null);
            try {
                const query = buildQuery({ moduleIds: selectedModuleIds, unitIds: selectedUnitIds });
                const res = await fetch(`http://localhost:3001/api/filters/locations${query}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch locations");
                }
                const data = await res.json();
                setLocations(data.locations || []);
            } catch (err) {
                console.error(err);
                setError("Error fetching locations");
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, [selectedModuleIds, selectedUnitIds]);

    // Convert modules into react-select options
    const moduleOptions: SelectOption[] = modules.map((m) => ({
        value: m.id,
        label: m.title,
    }));
    // Convert units into react-select options
    const unitOptions: SelectOption[] = units.map((u) => ({
        value: u.id,
        label: u.name,
    }));
    // Convert locations into react-select options
    const locationOptions: SelectOption[] = locations.map((l) => ({
        value: l.id,
        label: l.name,
    }));

    // Handlers for multi-select changes
    const handleChangeSelectedModules = (options: MultiValue<SelectOption>) => {
        const ids = options.map((opt) => opt.value);
        setSelectedModuleIds(ids);
        setIsValid(false);
    };
    
    const handleChangeSelectedUnits = (options: MultiValue<SelectOption>) => {
        const ids = options.map((opt) => opt.value);
        setSelectedUnitIds(ids);
        setIsValid(false);
    };
    
    const handleChangeSelectedLocations = (options: MultiValue<SelectOption>) => {
        const ids = options.map((opt) => opt.value);
        setSelectedLocationIds(ids);
        setIsValid(false);
    };

    // Apply filters
    const handleApplyFilters = async () => {
        setLoading(true);
        setError(null);
        try {
            const payload = {
                moduleIds: selectedModuleIds,
                unitIds: selectedUnitIds,
                locationIds: selectedLocationIds,
            };
            const res = await fetch("http://localhost:3001/api/filters/validate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.errors.join(", ")); // alternatively only show the first error: errorData.errors[0]
                setIsValid(false);
            } else {
                setIsValid(true);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Reset all filters
    const resetFilters = () => {
        setSelectedModuleIds([]);
        setSelectedUnitIds([]);
        setSelectedLocationIds([]);
        setIsValid(false);

        console.log(modules, units, locations);
    };

    // --- Render UI ---
    return (
        <div className="p-4">
            <h3 className="text-2xl font-bold">Filters</h3>

            {/* Select Modules */}
            <h5 className="text-sm font-semibold">Select modules:</h5>
            <Select
                className="text-black mb-2"
                placeholder={modules.length ? "Select modules" : "No modules available"}
                isMulti
                instanceId="modules-select"
                options={moduleOptions}
                onChange={handleChangeSelectedModules}
                value={moduleOptions.filter((option) => selectedModuleIds.includes(option.value))}
            />

            {/* Select Units */}
            <h5 className="text-sm font-semibold">Select units:</h5>
            <Select
                className="text-black mb-2"
                placeholder={units.length ? "Select units" : "No units available"}
                isMulti
                instanceId="units-select"
                options={unitOptions}
                onChange={handleChangeSelectedUnits}
                value={unitOptions.filter((option) => selectedUnitIds.includes(option.value))}
            />

            {/* Select Locations */}
            <h5 className="text-sm font-semibold">Select locations:</h5>
            <Select
                className="text-black mb-2"
                placeholder={locations.length ? "Select locations" : "No modules locations"}
                isMulti
                instanceId="locations-select"
                options={locationOptions}
                onChange={handleChangeSelectedLocations}
                value={locationOptions.filter((option) => selectedLocationIds.includes(option.value))}
            />

            {/* Apply & Reset Buttons */}
            <div className="mt-4">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold m-2 py-2 px-4 rounded"
                    onClick={handleApplyFilters}
                    disabled={loading}
                >
                    Apply Filters
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded"
                    onClick={resetFilters}
                    disabled={loading}
                >
                    Reset Filters
                </button>
            </div>
            <div>
                <h4 className="text-md font-semibold mt-2">Result: </h4>
                {/* Display filtered list or loading or error messages */}
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {isValid && !loading && (
                    <div>
                        <p>filters are valid</p>
                        <ul>
                            <li>
                                Modules:{" "}
                                {modules
                                    .filter((m) => selectedModuleIds.includes(m.id))
                                    .map((m) => m.title)
                                    .join(", ")}
                            </li>
                            <li>
                                Units:{" "}
                                {units
                                    .filter((u) => selectedUnitIds.includes(u.id))
                                    .map((u) => u.name)
                                    .join(", ")}
                            </li>
                            <li>
                                Locations:{" "}
                                {locations
                                    .filter((l) => selectedLocationIds.includes(l.id))
                                    .map((l) => l.name)
                                    .join(", ")}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
