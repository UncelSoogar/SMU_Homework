Attribute VB_Name = "TestCode"
Sub TickerValues()

'loop through all sheets
'for each ws
'next ws

'find last row
    Dim Lastrow As Long
    Lastrow = Range("A" & Rows.Count).End(xlUp).Row

'find last column
    Dim lastcolumn As Long
    lastcolumn = Cells(1, Columns.Count).End(xlToLeft).Column
   

'display col headers
    Cells(1, 9).Value = "Ticker"
    Cells(1, 10).Value = "Yearly Change"
    Cells(1, 11).Value = "Percent Change"
    Cells(1, 12).Value = "Total Stock Volume"

'loop through all rows.
'Change forloop to lastrow after testing code.
    'variables
        Dim ticker As String
        Dim tickerrow As Integer
        tickerrow = 1
        Dim openvalue As Double
        Dim yrchng As Double
        Dim percentchange As Double
        Dim stockvol As Long
    
    'init. values
        openvalue = Cells(2, 3).Value
    
    For i = 2 To Lastrow
    'find each stock ticker
        
        If Cells(i, 1).Value <> Cells(i + 1, 1) Then
            ticker = Cells(i, 1).Value
                'display ticker name
                'determine row, write to table
                    tickerrow = tickerrow + 1
                    Cells(tickerrow, 9).Value = ticker
                'calc yrchange
                    yrchange = Cells(i, 6).Value - openvalue
                'display yrchange
                    Cells(tickerrow, 10).Value = yrchange
                'calc percentchange
                    percentchange = yrchange / openvalue
                'display percentchange
                    Cells(tickerrow, 11).Value = percentchange
                'format to %
                    Cells(tickerrow, 11).NumberFormat = "0.00%"
                'display volume
                    stockvol = Cells(i, 7).Value
                    Cells(tickerrow, 12).Value = stockvol
                
        
            
            'reset values
            openvalue = Cells(i + 1, 3).Value
        'else i is last row
            ElseIf i = Lastrow Then
            'ticker value and display
                ticker = Cells(i, 1).Value
                tickerrow = tickerrow + 1
                Cells(tickerrow, 9).Value = ticker
            'yrchange value and display
                yrchange = Cells(i, 6).Value - openvalue
                Cells(tickerrow, 10).Value = yrchange
            'percent change calue and display
                percentchange = yrchange / openvalue
                Cells(tickerrow, 11).Value = percentchange
            'total volume and display
                stockvol = Cells(i, 7)
                Cells(tickerrow, 12).Value = stockvol
                    
        End If

    'conditionally format pos. = green, neg. = red
        Next i
            For i = 2 To Lastrow
                If Cells(i, 10).Value > 0 Then
                    Cells(i, 10).Interior.ColorIndex = 4
                ElseIf Cells(i, 10).Value < 0 Then
                    Cells(i, 10).Interior.ColorIndex = 3
                End If
        Next i
    
    'find and display greatest increase and decrease, and greatest volume. display corresponding ticker name
    'variables
        Dim increase As Double
            increase = 0
        Dim decrease As Double
            decrease = 0
        Dim grtvol As Long
            grtvol = 0
        
            
    'write labels
        Range("o2").Value = "Greatest % Increase"
        Range("o3").Value = "Greatest % Decrease"
        Range("o4").Value = "Greatest Volume"
        Range("p1").Value = "Ticker"
        Range("q1").Value = "Value"
        
    'loop to find values and ticker
        For i = 2 To Lastrow
            'find increase
                If Cells(i, 11).Value > increase Then
                        increase = Cells(i, 11).Value
                        Range("p2").Value = Cells(i, 9).Value
                        Range("q2").Value = increase
                        Range("q2").NumberFormat = "0.00%"
                End If
            'find decrease
                If Cells(i, 11).Value < decrease Then
                        decrease = Cells(i, 11).Value
                        Range("p3").Value = Cells(i, 9).Value
                        Range("q3").Value = decrease
                        Range("q3").NumberFormat = "0.00%"
                End If
            'find greast vol.
                If Cells(i, 11).Value > grtvol Then
                        grtvol = Cells(i, 11).Value
                        Range("p4").Value = Cells(i, 9).Value
                        Range("q4").Value = grtvol
                End If
                
        Next i

'identify greatest % increase
'display name and value

'identify greatest %decrease
'display name and value

'identify greatest volume
'display name and volume


End Sub

