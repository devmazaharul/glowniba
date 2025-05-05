"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { districData, divisionData, unionData, upazilaData } from "@/lib/address";

const Address = () => {
  const [divisionId, setDivisionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [upazilaId, setUpazilaId] = useState("");
  const [unionId, setUnionId] = useState("");

  const filteredDistricts = districData.filter(
    (item) =>parseInt( item.division_id) === parseInt(divisionId)
  );
  const filteredUpazilas = upazilaData.filter(
    (item) => parseInt( item.district_id)=== parseInt(districtId)
  );
  const filteredUnions = unionData.filter(
    (item) => parseInt(item.upazilla_id) === parseInt(upazilaId)
  );

  const selectedDivision = divisionData.find((item) => parseInt(item.id )=== parseInt(divisionId));
  const selectedDistrict = districData.find((item) => parseInt(item.id )=== parseInt(districtId));
  const selectedUpazila = upazilaData.find((item) => parseInt(item.id ) === parseInt(upazilaId));
  const selectedUnion = unionData.find((item) => parseInt(item.id )=== parseInt(unionId));

  const makeAddressObject =
    divisionId &&
    districtId &&
    upazilaId &&
    unionId && {
      division: selectedDivision?.bn_name,
      district: selectedDistrict?.bn_name,
      upazila: selectedUpazila?.bn_name,
      union: selectedUnion?.bn_name,
    };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold">ঠিকানা নির্বাচন করুন</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Division */}
        <Select
          value={divisionId}
          
          onValueChange={(value) => {
            setDivisionId(value);
            setDistrictId("");
            setUpazilaId("");
            setUnionId("");
          }}
        >
          <SelectTrigger className="cursor-pointer w-full" >
            <SelectValue  placeholder="বিভাগ নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent >
            {divisionData.map((item) => (
              <SelectItem className="cursor-pointer" key={item.id} value={item.id.toString()}>
                {item.bn_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* District */}
        <Select
          value={districtId}
          onValueChange={(value) => {
            setDistrictId(value);
            setUpazilaId("");
            setUnionId("");
          }}
          disabled={!divisionId}
        >
          <SelectTrigger className="cursor-pointer  w-full" >
            <SelectValue placeholder="জেলা নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent >
            {filteredDistricts.map((item) => (
              <SelectItem className="cursor-pointer"  key={item.id} value={item.id.toString()}>
                {item.bn_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Upazila */}
        <Select
          value={upazilaId}
          onValueChange={(value) => {
            setUpazilaId(value);
            setUnionId("");
          }}
          disabled={!districtId}
        >
          <SelectTrigger className="cursor-pointer  w-full" >
            <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {filteredUpazilas.map((item) => (
              <SelectItem className="cursor-pointer"  key={item.id} value={item.id.toString()}>
                {item.bn_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Union */}
        <Select
          value={unionId}
          onValueChange={(value) => setUnionId(value)}
          disabled={!upazilaId}
        >
          <SelectTrigger className="cursor-pointer  w-full" >
            <SelectValue placeholder="ইউনিয়ন নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {filteredUnions.map((item) => (
              <SelectItem className="cursor-pointer"  key={item.id} value={item.id.toString()}>
                {item.bn_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {makeAddressObject && (
        <div className="mt-4 bg-green-100 border  p-4 rounded-md shadow-2xl shadow-gray-100 text-sm">
          ✅ আপনার ঠিকানা:
          <strong className="block mt-1">
            {selectedDivision?.bn_name} → {selectedDistrict?.bn_name} → {selectedUpazila?.bn_name} → {selectedUnion?.bn_name}
          </strong>
          <pre className="text-xs bg-white p-2 rounded mt-2">
            {JSON.stringify(makeAddressObject, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Address;
