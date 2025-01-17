import React from "react";
import { getContract } from "thirdweb";
import { client } from "../client";
import { baseSepolia } from "thirdweb/chains";
import { CROWDFUNDING_FACTORY } from "../Constants/contracts";
import { useReadContract } from "thirdweb/react";
import Link from "next/link";

type CampaignCardProps = {
  campaignAddress: string;
  page?: string;
};

const CampaignCard = ({ campaignAddress,page }: CampaignCardProps) => {
  const contract = getContract({
    client: client,
    chain: baseSepolia,
    address: campaignAddress,
  });

  const { data: campaignName } = useReadContract({
    contract,
    method: "function name() view returns (string)",
    params: [],
  });

  const { data: campaignDescription } = useReadContract({
    contract,
    method: "function description() view returns (string)",
    params: [],
  });

  const { data: campaignGoal, isLoading: isLoadingGoal } = useReadContract({
    contract,
    method: "function goal() view returns (uint256)",
    params: [],
  });

  const { data: campaignBalance, isLoading: isLoadingBalance } =
    useReadContract({
      contract,
      method: "function getContractBalance() view returns (uint256)",
      params: [],
    });

  const totalBalance = campaignBalance?.toString();
  const totalGoal = campaignGoal?.toString();
  let balancePercentage =
    (parseInt(totalBalance as string) / parseInt(totalGoal as string)) * 100;

  if (balancePercentage >= 100) {
    balancePercentage = 100;
  }

  const successCampaign = balancePercentage >= 100;

  if(successCampaign && page != "dashboard") {
    return 
  }

  return (
    <div className="w-[30vw]  flex flex-col justify-between p-6 bg-zinc-900 border border-slate-200 rounded-lg shadow mt-10">
      <div>
        {!isLoadingBalance  && (
          <div className="mb-4">
            <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-right"
                style={{ width: `${balancePercentage?.toString()}%` }}
              >
                <p className="text-white dark:text-white text-xs p-1">
                  ${campaignBalance?.toString()}
                </p>
              </div>
              <p className="absolute top-0 right-0 text-white dark:text-white text-xs p-1">
                {balancePercentage >= 100
                  ? ""
                  : `${balancePercentage?.toString()}%`}
              </p>
            </div>
          </div>
        )}
        <h5 className="mb-2 text-2xl font-bold tracking-tight">
          {campaignName}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {campaignDescription}
        </p>
      </div>

      <Link href={`/campaign/${campaignAddress}`} passHref={true}>
        <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          View Campaign
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </p>
      </Link>
    </div>
  );
};

export default CampaignCard;
