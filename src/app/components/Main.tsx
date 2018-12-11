import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { Matrix } from './Matrix';
import '../style.css'

export class Main extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            row: 5,
            column: 5
        };
    }

    handleChange = (event: any, name: string) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <div className='content' style={{flexDirection:'column'}}>
                <h1>Cell Regions</h1>
                <div style={{ flexDirection: 'row' }}>
                    <TextField
                        id="filled-name"
                        label="Row"
                        value={this.state.row}
                        onChange={(event: any) => this.handleChange(event, 'row')}
                        margin="normal"
                        variant="filled"
                        style={{ padding: 10 }}
                    />
                    <TextField
                        id="filled-name"
                        label="Column"
                        value={this.state.column}
                        onChange={(event: any) => this.handleChange(event, 'column')}
                        margin="normal"
                        variant="filled"
                        style={{ padding: 10 }}
                    />
                </div>
                <div>
                    <Matrix row={this.state.row} column={this.state.column} />
                </div>
            </div>
        )
    }
}


