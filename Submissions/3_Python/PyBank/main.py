#Read and open budget data
import csv

with open(r"PyBank\Resources\budget_data.csv") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    
    #remove header
    csv_header = next(csvreader)

    #create dictionaries to reference for calcs
    month = []
    profit = []
    profitchange= []
    for row in csvreader:
        month.append(row[0])
        profit.append(row[1])
    
    #calc total months
    tmonths = len(month)

#calc total profits, tmonths is also the end value of the range
    #starting variable values
    tprofit = 0
    #loop to add profits
    for _ in range(0, tmonths):
        tprofit += int(profit[_])
        currentprofit = int(profit[_])
    #loop to calc and store profit change    
        lastprofit = int(profit[_ - 1])
        profitchange.append(currentprofit - lastprofit)

#avg profit change, loop to total changes, divide by (tmonths -1).
    tchange = 0
    for _ in range(1, tmonths):
        tchange += int(profitchange[_])
    avgchange = tchange / (tmonths - 1)

#find greatest monthly increase and decrease.
    increase = max(profitchange)
    decrease = min(profitchange)

#find month with index
    increasemonth = month[(profitchange.index(increase))]
    decreasemonth = month[(profitchange.index(decrease))]

#print calcs to terminal
    print("Financial Analysis")
    print("***********************************************")
    print(f"Total Months: {tmonths}")
    print(f"Total Profit: {tprofit}")
    print(f"Average Monthly Change: ${avgchange}")
    print(f"Greatest Monthly Increase: {increasemonth} $({increase})")
    print(f"Greatest Monthly Decrease: {decreasemonth} $({decrease})")

#write calcs to .txt
outputtxt = open(r"PyBank\Financials.txt", "w")
outputtxt.write("Financial Analysis \n")
outputtxt.write("*********************************************** \n")
outputtxt.write(f"Total Months: {tmonths} \n")
outputtxt.write(f"Total Profit: {tprofit} \n")
outputtxt.write(f"Average Monthly Change: ${avgchange} \n")
outputtxt.write(f"Greatest Monthly Increase: {increasemonth} $({increase}) \n")
outputtxt.write(f"Greatest Monthly Decrease: {decreasemonth} $({decrease}) \n")