Attribute VB_Name = "tickervalues"
Sub tickervalues()

'loop through all sheets
For Each ws In Worksheets

'find last row
    Dim Lastrow As Long
    Lastrow = ws.Range("A" & Rows.Count).End(xlUp).Row

'display col headers
    ws.Cells(1, 9).Value = "Ticker"
    ws.Cells(1, 10).Value = "Yearly Change"
    ws.Cells(1, 11).Value = "Percent Change"
    ws.Cells(1, 12).Value = "Total Stock Volume"

'loop through all rows, collect and display ticker name, yr change, % change, volume
    'variables and init. values
        Dim ticker As String
        Dim tickerrow As Integer
            tickerrow = 1
        Dim openvalue As Double
            openvalue = ws.Cells(2, 3).Value
        Dim yrchng As Double
        Dim percentchange As Double
        Dim stockvol As Double
            stockvol = ws.Cells(2, 7).Value
    
    
    For i = 2 To Lastrow
    'find each stock ticker
        
        If ws.Cells(i, 1).Value <> ws.Cells(i + 1, 1) Then
            ticker = ws.Cells(i, 1).Value
                'display ticker name
                'determine row, write to table
                    tickerrow = tickerrow + 1
                    ws.Cells(tickerrow, 9).Value = ticker
                'calc yrchange
                    yrchange = ws.Cells(i, 6).Value - openvalue
                'display yrchange
                    ws.Cells(tickerrow, 10).Value = yrchange
                'calc percentchange, fix divide by zero
                    If openvalue <> 0 Then
                        percentchange = yrchange / openvalue
                    'display percentchange
                        ws.Cells(tickerrow, 11).Value = percentchange
                    Else
                        ws.Cells(tickerrow, 11).Value = 0
                    End If
                'format to %
                    ws.Cells(tickerrow, 11).NumberFormat = "0.00%"
                'calc volume
                    stockvol = ws.Cells(i, 7).Value + stockvol
                'display volume
                    ws.Cells(tickerrow, 12).Value = stockvol
            
            'reset values
                openvalue = ws.Cells(i + 1, 3).Value
                stockvol = 0
                
        'else next row is the same ticker
            Else
            'add the total volume
                stockvol = stockvol + ws.Cells(i, 7).Value
                    
        End If

    'conditionally format pos. = green, neg. = red
        Next i
            For i = 2 To Lastrow
                If ws.Cells(i, 10).Value > 0 Then
                    ws.Cells(i, 10).Interior.ColorIndex = 4
                ElseIf ws.Cells(i, 10).Value < 0 Then
                    ws.Cells(i, 10).Interior.ColorIndex = 3
                End If
        Next i
    
    'find and display greatest increase and decrease, and greatest volume. display corresponding ticker name
    'variables and init. value
        Dim increase As Double
            increase = 0
        Dim decrease As Double
            decrease = 0
        Dim grtvol As Double
            grtvol = 0
        
            
    'write labels
        ws.Range("o2").Value = "Greatest % Increase"
        ws.Range("o3").Value = "Greatest % Decrease"
        ws.Range("o4").Value = "Greatest Volume"
        ws.Range("p1").Value = "Ticker"
        ws.Range("q1").Value = "Value"
        
    'loop to find values and ticker
        For i = 2 To Lastrow
            'find increase and display
                If ws.Cells(i, 11).Value > increase Then
                        increase = ws.Cells(i, 11).Value
                        ws.Range("p2").Value = ws.Cells(i, 9).Value
                        ws.Range("q2").Value = increase
                        ws.Range("q2").NumberFormat = "0.00%"
                End If
            'find decrease and display
                If ws.Cells(i, 11).Value < decrease Then
                        decrease = ws.Cells(i, 11).Value
                        ws.Range("p3").Value = ws.Cells(i, 9).Value
                        ws.Range("q3").Value = decrease
                        ws.Range("q3").NumberFormat = "0.00%"
                End If
            'find greast vol. and display
                If ws.Cells(i, 12).Value > grtvol Then
                        grtvol = ws.Cells(i, 12).Value
                        ws.Range("p4").Value = ws.Cells(i, 9).Value
                        ws.Range("q4").Value = grtvol
                End If
                
        Next i
Next ws

'Great job. You are kickin rad, man!
'There is nothing basic about you, visually.
'Stop it, you are going to make my .colorindex = blush

End Sub

