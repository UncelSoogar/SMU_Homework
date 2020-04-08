#Read and open budget data
import csv

csvpath = r"PyBank\Resources\budget_data.csv"

with open(r"PyBank\Resources\budget_data.csv") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    
    #remove header
    csv_header = next(csvreader)
    print(f"CSV Header: {csv_header}")

    #create dictionaries to reference for calcs
    month = []
    profit = []
    profitchange= []
    for row in csvreader:
        month.append(row[0])
        profit.append(row[1])
    
    #calc total months
    tmonths = len(month)
    print(tmonths)

    #calc total profits, tmonths is also the end value of the range
    #define variable
    tprofit = 0

    #loop to add profits
    for i in range(0, tmonths):
        tprofit += int(profit[i])
        currentprofit = int(profit[i])
    #loop to calc and store profit change    
        lastprofit = int(profit[i - 1])
        profitchange.append(currentprofit - lastprofit)
    print(tprofit)

    #avg profit change, loop to total changes, divide by tmonths -1.
    tchange = 0
    for i in range(1, tmonths):
        tchange += int(profitchange[i])
    avgchange = tchange / (tmonths - 1)
    print(len(profitchange))
    print(avgchange)


    #find greatest monthly increase and decrease
    increase = max(profitchange)
    print(increase)
    decrease = min(profitchange)
    print(decrease)
    increasemonth = month[(profitchange.index(increase))]
    decreasemonth = month[(profitchange.index(decrease))]
    print(increasemonth)
    print(decreasemonth)

    #print calcs to terminal

# #write calcs to .txt