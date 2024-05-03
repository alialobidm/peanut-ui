'use client'

import Icon from '@/components/Global/Icon'
import * as _consts from '../Claim.consts'
import * as consts from '@/constants'
import * as interfaces from '@/interfaces'

export const AlreadyClaimedLinkView = ({ claimLinkData }: { claimLinkData: interfaces.ILinkDetails | undefined }) => {
    console.log(claimLinkData)
    return (
        <div className="flex w-full flex-col items-center justify-center gap-6 py-2 pb-20 text-center">
            <label className="text-h2">Sorry, this link has been claimed already.</label>
            <label className="text-h8 font-bold ">
                This link previously contained {claimLinkData?.tokenSymbol} on{' '}
                {consts.supportedPeanutChains &&
                    consts.supportedPeanutChains.find((chain) => chain.chainId == claimLinkData?.chainId)?.name}
            </label>
            <label className="text-h9 font-normal">
                We would like to hear from your experience. Hit us up on{' '}
                <a className="cursor-pointer text-black underline dark:text-white">Discord!</a>
            </label>
            <div className="absolute bottom-0 -mb-0.5 flex h-20 w-[27rem] w-full flex-row items-center justify-start gap-2 border border-black border-n-1 bg-purple-3  px-4.5 dark:text-black">
                <div className="cursor-pointer border border-n-1 p-0 px-1">
                    <Icon name="send" className="-mt-0.5" />
                </div>
                <label className=" text-sm font-bold">Generate a payment link yourself!</label>
            </div>
        </div>
    )
}

export default AlreadyClaimedLinkView