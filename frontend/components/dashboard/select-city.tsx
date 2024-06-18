"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

interface City {
    id: string;
    city: string;
}

export default function SelectCity() {
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cities, setCities] = useState<City[]>([]);
    const { toast } = useToast();

    const fetchCities = async () => {
        try {
            const response = await fetch("/api/userlocation", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCities(data); // Assuming the response is an array of city objects
            } else {
                console.error("Failed to fetch cities");
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    const handleSelectChange = (value: string) => {
        const selected = cities.find((city) => city.city === value) || null;
        setSelectedCity(selected);
        setIsOpen(false);
    };

    const handleToggleDropdown = async (isOpen: boolean) => {
        setIsOpen(isOpen);
        if (isOpen) {
            await fetchCities();
        }
    };

    const handleDeleteCity = async () => {
        if (!selectedCity) return;

        try {
            const response = await fetch(`/api/userlocation/${selectedCity.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.ok) {
                console.log("City deleted successfully");
                toast({
                    variant: "destructive",
                    title: "Success!",
                    description: "City deleted successfully.",
                });
                fetchCities(); // Re-fetch the updated city list
                setSelectedCity(null); // Clear the selected city after deletion
            } else {
                console.error("Failed to delete city");
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            }
        } catch (error) {
            console.error("Error deleting city:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <Select onValueChange={handleSelectChange} onOpenChange={handleToggleDropdown}>
                <SelectTrigger id="status" aria-label="Select City">
                    <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                    {cities.map((city) => (
                        <SelectItem key={city.id} value={city.city}>
                            <div className="flex items-center justify-between w-full">
                                <span className="flex-grow text-left">{city.city}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button
                className="p-3 text-red-600 focus:outline-none rounded-md hover:bg-black"
                onClick={handleDeleteCity}
                disabled={!selectedCity} // Disable the button if no city is selected
                variant="outline"
            >
                <Trash2 size={15} />
            </Button>
        </div>
    );
}
