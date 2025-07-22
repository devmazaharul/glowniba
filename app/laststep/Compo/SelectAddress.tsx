'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { districData, divisionData, unionData, upazilaData } from '@/lib/address';
import { useEffect, useMemo, useState } from 'react';

export interface addressField {
  division:string,
  district:string,
  upazila:string,
  union:string
}

export default function SelectAddress({getAddressfromProp}:{getAddressfromProp:(item:addressField)=>void}) {
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [union, setUnion] = useState('');

  const filteredDistricts = districData.filter((item) => item.division_id == division);
  const filteredUpazilas = upazilaData.filter((item) => item.district_id == district);
  const filteredUnions = unionData.filter((item) => item.upazilla_id == upazila);

  const makeProperAddressObject =  useMemo(() => {
  return {
    division: division ? (divisionData.find((item) => item.id == division)?.bn_name ?? "N/A") : "N/A",
    district: district ? (districData.find((item) => item.id == district)?.bn_name ?? "N/A") : "N/A",
    upazila: upazila ? (upazilaData.find((item) => item.id == upazila)?.bn_name ?? "N/A") : "N/A",
    union: union ? (unionData.find((item) => item.id == union)?.bn_name ?? "N/A") : "N/A",
  };
}, [division, district, upazila, union]);

 useEffect(()=>{
 getAddressfromProp(makeProperAddressObject)
 },[getAddressfromProp,makeProperAddressObject])


  return (
 <div>
     <div className="grid grid-cols-2 gap-4">
      {/* Division Select */}
      <Select
        onValueChange={(value) => {
          setDivision(value);
          setDistrict('');
          setUpazila('');
          setUnion('');
        }}
        value={division}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Division" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Division</SelectLabel>
            {divisionData.map((val) => (
              <SelectItem key={val.id} value={val.id}>
                {val.bn_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* District Select */}
      <Select
        onValueChange={(value) => {
          setDistrict(value);
          setUpazila('');
          setUnion('');
        }}
        value={district}
        disabled={!division}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select District" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>District</SelectLabel>
            {filteredDistricts.map((val) => (
              <SelectItem key={val.id} value={val.id}>
                {val.bn_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Upazila Select */}
      <Select
        onValueChange={(value) => {
          setUpazila(value);
          setUnion('');
        }}
        value={upazila}
        disabled={!district}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Upazila" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Upazila</SelectLabel>
            {filteredUpazilas.map((val) => (
              <SelectItem key={val.id} value={val.id}>
                {val.bn_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Union Select */}
      <Select
        onValueChange={(value) => setUnion(value)}
        value={union}
        disabled={!upazila}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Union" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Union</SelectLabel>
            {filteredUnions.map((val) => (
              <SelectItem key={val.id} value={val.id}>
                {val.bn_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      
    </div>
          {/* view address division-distric-upazila-union */}
       <div className="mt-4 p-4 rounded-md  text-sm w-fit">
        <p>✅ আপনার ঠিকানা:</p>
        <b className="text-sm text-gray-600 flex py-1 items-center gap-2 w-full">
           {makeProperAddressObject.division } →  
           {makeProperAddressObject.district } →  
           {makeProperAddressObject.upazila } →  
           {makeProperAddressObject.union } 
        
        </b>  
        </div>  
 </div>
  );
}
