"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function SearchCity() {
    const [cityName, setCityName] = useState<string>("");
    const { toast } = useToast();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCityName(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await fetch("/api/userlocation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ city: cityName }),
            });

            if (response.ok) {
                console.log("City created successfully");
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "City created successfully.",
                });
                setCityName(""); // Clear the input field
            }
            else if (response.status === 409) {
                const data = await response.json();
                console.error(data.message);
                toast({
                    variant: "destructive",
                    title: "Location already exists",
                    description: data.message,
                });
                setCityName(""); // Clear the input field
            }
            else {
                const data = await response.json();
                console.error(data.message || "Failed to create city");
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: data.message || "There was a problem with your request.",
                });
            }

        } catch (error) {
            console.error("Error creating city:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        }
    };

    return (
        <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search..."
                value={cityName}
                onChange={handleInputChange}
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[405px]"
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
        </div>
    );
}
