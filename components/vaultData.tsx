import { useActiveAccount, useReadContract } from "thirdweb/react";
import { STAKE_CONTRACT, VAULT_CONTRACT  } from "../utils/constants";
import { balanceOf } from "thirdweb/extensions/erc20";
import { toEther } from "thirdweb";



const VaultData: React.FC = () => {
   
    const account = useActiveAccount();

    const vaultContract = "0xf63Fca327C555408819e26eDAc30F83E55a119f4";
    const stakeContract = "0x234329EA252e2B1Cc03c6efcfE1f072cb35Bc754";


    const { data: vaultTotalSupply, isLoading: loadingVaultTotalSupply} = useReadContract ({
        contract: VAULT_CONTRACT,
        method: "totalSupply"
    });

 

    const { data: spUsdtBalance, isLoading: loadingSpUsdtBalance} = useReadContract (
        balanceOf,
        {
            contract: STAKE_CONTRACT,
            address: account?.address || "",
            queryOptions: {
                enabled: !!account
            }
       
    });

    const { data: vaultReserve, isLoading: loadingVaultReserve} = useReadContract (
        balanceOf,
        {
            contract: STAKE_CONTRACT,
            address: vaultContract,
            queryOptions: {
                enabled: !!account
            }
       
    });



    const { 
        data: totalDeposit, 
        isLoading: loadingTotalDeposit,
        refetch: refetchTotalDeposit,
    } = useReadContract (
        balanceOf,
        {
            contract: VAULT_CONTRACT,
            address: stakeContract,
            
       
    });

    function truncate(vaule: string | number, decimalPlaces: number): number {
        const numericValue: number = Number(vaule);
        if (isNaN(numericValue)) {
            throw new Error('Invalid input: value must be convertible to a number');
        }
        const factor: number = Math.pow(10,decimalPlaces);
        return Math.trunc(numericValue*factor) / factor
    }
    
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            
            
            
        }}>
            <div style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                  
            }}>
                
                
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  textAlign:"center",
                  borderRadius: "10px",
                  borderColor: "gray",
                  border: "solid",
                  marginTop: "20px",
                }}
                  >
                    <p>Total Supply</p>
                    {loadingVaultTotalSupply ? (
                
                <p>...</p>
            
                
            ) : (
                
                <h3>{truncate(toEther(vaultTotalSupply!),2).toLocaleString() }<span style={{fontSize: "8px"}}>SOS</span></h3>
                
            )}

<p style={{
                    fontSize: "8px",
                    marginTop: "5px"
                }}>View on Basescan</p>


                    </div>

                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  textAlign:"center",
                  borderRadius: "10px",
                  borderColor: "gray",
                  border: "solid",
                  marginTop: "20px",
                }}
                  >
                    <p >Total SOS Staked</p>
                    {loadingTotalDeposit ? (
                
                <p>...</p>
            
                
            ) : (
                
                <h3>{truncate(toEther(totalDeposit!),2).toLocaleString() }<span style={{fontSize: "8px"}}>SOS</span></h3>
                
            )}
                
                </div>

                

                
                
            </div>
        </div>
        
    )
};

export default VaultData;