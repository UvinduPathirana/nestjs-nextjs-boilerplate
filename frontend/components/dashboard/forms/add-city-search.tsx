"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function SearchCity() {
  const [cityName, setCityName] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSuggestions = async (query: string) => {
      if (query.length > 2) {
        try {
          const response = await fetch(`/api/suggestions?query=${query}`);
          if (response.ok) {
            const data = await response.json();
            setSuggestions(data.suggestions);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions(cityName);
  }, [cityName]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCityName(value);
  };

  const handleSearch = async (city?: string) => {
    const cityToSearch = city || cityName;
    try {
      const response = await fetch("/api/userlocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: cityToSearch }),
      });

      if (response.ok) {
        toast({
          variant: "success",
          title: "Success!",
          description: "City created successfully.",
        });
        setCityName(""); // Clear the input field
        setSuggestions([]); // Clear suggestions
      } else if (response.status === 409) {
        const data = await response.json();
        console.error(data.message);
        toast({
          variant: "destructive",
          title: "Location already exists",
          description: data.message,
        });
        setCityName(""); // Clear the input field
        setSuggestions([]); // Clear suggestions
      } else {
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

  const handleSelectSuggestion = (suggestion: string) => {
    setCityName(suggestion);
    setSuggestions([]);
    handleSearch(suggestion);
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
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-black border border-gray-300 dark:border-black rounded-md mt-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
