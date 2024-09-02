"use client";

import { getContract } from "thirdweb";
import { client } from "./client";
import { baseSepolia } from "thirdweb/chains";
import { CROWDFUNDING_FACTORY } from "./Constants/contracts";
import { useReadContract } from "thirdweb/react";
import { log } from "console";
import CampaignCard from "./Components/CampaignCard";

export default function Home() {
  const contract = getContract({
    client: client,
    chain: baseSepolia,
    address: CROWDFUNDING_FACTORY,
  });

  const { data: campaigns, isLoading } = useReadContract({
    contract,
    method:
      "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
    params: [],
  });

  console.log(campaigns);

  return (
    <main className="">
      <div className="flex flex-col items-start min-h-screen py-4 px-24">
        <h1 className="text-6xl font-bold">Campaign</h1>
        <div className="grid grid-cols-3 gap-10">
          {!isLoading &&
            campaigns &&
            campaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.campaignAddress}
                campaignAddress={campaign.campaignAddress}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
