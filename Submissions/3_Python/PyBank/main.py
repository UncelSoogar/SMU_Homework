#Read budget data csv
import csv

with open(r"PyBank\Resources\budget_data.csv") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")
    
    #remove header
    csv_header = next(csvreader)
    print(f"CSV Header: {csv_header}")

    # for row in csvreader:
    #     print(row)

    #count number of months
    tmonths = len(list(csvreader))
    print(tmonths)

    #define variables in for loop
   
    grinc = 0
    grdec = 0
    #total profits
    tprofit = sum(float(row[1]) for row in csvreader)
    print(tprofit)
#calc avg change per month

#find greatest monthly increase

#find greatest monthly decrease

#print calcs to terminal

#write calcs to .txt