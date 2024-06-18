"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Trash2 } from "lucide-react"
import React, { useState } from 'react';


export default function SelectCity() {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelectChange = (value: string) => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <Select onValueChange={handleSelectChange} onOpenChange={handleToggleDropdown}>
                <SelectTrigger id="status" aria-label="Select City">
                    <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="colombo">
                        <div className="flex items-center justify-between w-full">
                            <span className="flex-grow text-left">Colombo</span>
                            {isOpen && (
                                <button className="ml-2 p-1 text-red-600 focus:outline-none">
                                    <Trash2 size={15} />
                                </button>
                            )}
                        </div>
                    </SelectItem>
                    <SelectItem value="gampaha">
                        <div className="flex items-center justify-between w-full">
                            <span className="flex-grow text-left">Gampaha</span>
                            {isOpen && (
                                <button className="ml-2 p-1 text-red-600 focus:outline-none">
                                    <Trash2 size={15} />
                                </button>
                            )}
                        </div>
                    </SelectItem>
                    <SelectItem value="balangoda">
                        <div className="flex items-center justify-between w-full">
                            <span className="flex-grow text-left">Balangoda</span>
                            {isOpen && (
                                <button className="ml-2 p-1 text-red-600 focus:outline-none">
                                    <Trash2 size={15} />
                                </button>
                            )}
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}