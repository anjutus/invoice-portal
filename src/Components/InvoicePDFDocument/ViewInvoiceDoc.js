import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { fontStyle } from '@mui/system';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        display: 'flex',
        width: "80% ",
    height: "100% ",
    },
    section: {
        margin: 10,
        padding: 10,
        flex:1
    },
    sectionright: {
        margin: 10,
        padding: 10,
    },
    table: { 
        display: "table", 
        width: "auto", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderRightWidth: 0, 
        borderBottomWidth: 0 
      }, 
      tableRow: { 
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableCol: { 
        width: "25%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableCell: { 
        margin: "auto", 
        marginTop: 5, 
        fontSize: 10 
      }
});
// Create Document Component
export default function ViewInvoiceDoc() {
    return (
        <PDFViewer style={{ height: "100vh", width: "100vw"}} showToolbar={false}>
            <Document >
                <Page orientation="landscape" size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>Supplier Name : Abc</Text>
                    </View>
                    <View style={styles.section}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View>
                                 <Text>Isuue ID</Text>
                                 
                               <Text>12345</Text>
                            </View>
                          
                        </View>
                        <View>
                            <View>
                                 <Text>Isuue date</Text>
                            </View>
                            <View>
                               <Text>12/34/5</Text>
                            </View>
                        </View>
                        
                    </View>
                    </View>
                    
                </Page>
            </Document>
        </PDFViewer>

    )

};