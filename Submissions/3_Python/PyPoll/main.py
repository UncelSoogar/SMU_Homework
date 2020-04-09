#Read and open polling data
import csv

with open(r"PyPoll\Resources\election_data.csv") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    
    #remove header
    csv_header = next(csvreader)

#create dictionaries to reference for calcs
    voterid = []
    #county = []
    candidate= []
    uniquename = []
    
    for row in csvreader:
        voterid.append(row[0])
        #county.append(row[1])
        candidate.append(row[2])
    
#calc total votes
    tvotes = len(voterid)
    print(tvotes)

#separate and count each candidate
    #find unique names
    for _ in candidate:
        if _ not in uniquename: 
            uniquename.append(_) 
#find counts for each candidate
#    for word in candidate:
    for i in range(len(uniquename)):
        print(f"{uniquename[i]} received {candidate.count(uniquename[i])} votes.")

        

# #calc total profits, tmonths is also the end value of the range
#     #starting variable values
#     tprofit = 0
#     #loop to add profits
#     for _ in range(0, tmonths):
#         tprofit += int(profit[_])
#         currentprofit = int(profit[_])
#     #loop to calc and store profit change    
#         lastprofit = int(profit[_ - 1])
#         profitchange.append(currentprofit - lastprofit)

# #avg profit change, loop to total changes, divide by (tmonths -1).
#     tchange = 0
#     for _ in range(1, tmonths):
#         tchange += int(profitchange[_])
#     avgchange = tchange / (tmonths - 1)

# #find greatest monthly increase and decrease.
#     increase = max(profitchange)
#     decrease = min(profitchange)

# #find month with index
#     increasemonth = month[(profitchange.index(increase))]
#     decreasemonth = month[(profitchange.index(decrease))]

# #print calcs to terminal
#     print("Financial Analysis")
#     print("***********************************************")
#     print(f"Total Months: {tmonths}")
#     print(f"Total Profit: {tprofit}")
#     print(f"Average Monthly Change: ${avgchange}")
#     print(f"Greatest Monthly Increase: {increasemonth} $({increase})")
#     print(f"Greatest Monthly Decrease: {decreasemonth} $({decrease})")

# #write calcs to .txt
# outputtxt = open(r"PyBank\Financials.txt", "w")
# outputtxt.write("Financial Analysis \n")
# outputtxt.write("*********************************************** \n")
# outputtxt.write(f"Total Months: {tmonths} \n")
# outputtxt.write(f"Total Profit: {tprofit} \n")
# outputtxt.write(f"Average Monthly Change: ${avgchange} \n")
# outputtxt.write(f"Greatest Monthly Increase: {increasemonth} $({increase}) \n")
# outputtxt.write(f"Greatest Monthly Decrease: {decreasemonth} $({decrease}) \n")