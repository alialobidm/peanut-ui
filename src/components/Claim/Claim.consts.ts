import * as views from './Link'
import * as interfaces from '@/interfaces'
import { interfaces as peanutInterfaces } from '@squirrel-labs/peanut-sdk'
export type ClaimType = 'address' | 'wallet'

export type ClaimScreens = 'INITIAL' | 'CONFIRM' | 'SWAP_INITIAL' | 'SUCCESS'

export interface IClaimScreenState {
    screen: ClaimScreens
    idx: number
}

export const INIT_VIEW_STATE: IClaimScreenState = {
    screen: 'INITIAL',
    idx: 0,
}

export const CLAIM_SCREEN_FLOW: ClaimScreens[] = ['INITIAL', 'CONFIRM', 'SWAP_INITIAL', 'SUCCESS']

export const CLAIM_SCREEN_MAP: { [key in ClaimScreens]: { comp: React.FC<any> } } = {
    INITIAL: { comp: views.InitialClaimLinkView },
    CONFIRM: { comp: views.ConfirmClaimLinkView },
    SWAP_INITIAL: { comp: views.SwapInitialClaimLinkView },
    SUCCESS: { comp: views.SuccessClaimLinkView },
}

export interface IClaimScreenProps {
    onPrev: () => void
    onNext: () => void
    onCustom: (screen: ClaimScreens) => void
    claimLinkData: interfaces.ILinkDetails
    crossChainDetails: Array<peanutInterfaces.ISquidChain & { tokens: peanutInterfaces.ISquidToken[] }> | undefined
    type: ClaimType
    setClaimType: (type: ClaimType) => void
    recipientAddress: string | undefined
    setRecipientAddress: (address: string) => void
    tokenPrice: number
    setTokenPrice: (price: number) => void
    transactionHash: string
    setTransactionHash: (hash: string) => void
}

export type claimLinkState = 'LOADING' | 'CLAIM' | 'ALREADY_CLAIMED' | 'NOT_FOUND'