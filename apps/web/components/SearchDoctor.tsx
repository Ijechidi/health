'use client';

import React, { useState } from 'react';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@repo/ui/components/select';

export default function SearchDoctor() {
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = () => {
    console.log({ location, condition, category });
  };

  return (
    <div className=" flex flex-col gap-4">
      {/* <h3 className="text-foreground font-semibold text-lg">Find Your Doctor</h3> */}

      {/* Location + Condition sur la même ligne même sur petit écran */}
      <div className="flex gap-3 items-center flex-wrap bg-background rounded-md p-2  shadow-lg">
        <div className="flex">
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex">
          <Input
            type="text"
            placeholder="Condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full"
          />
        </div>
          <div className="flex-1 min-w-[120px]">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="orthopedics">Orthopedics</SelectItem>
            <SelectItem value="internal">Internal Medicine</SelectItem>
            <SelectItem value="pulmonology">Pulmonology</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button size="lg"  className="self-start   " onClick={handleSearch}>
            Search
      </Button>
      </div>


    </div>
  );
}
