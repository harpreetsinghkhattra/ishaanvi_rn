import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { WView, WRow, WTextInput, WText } from './';
import { PixelRatio } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Palette from '../../Palette';

/** Land area slider component */
export default class LandArea extends PureComponent {

    constructor(props) {
        super(props);

        const { value } = this.props;
        this.state = {
            selectedValues: value
        }

        console.log("slectProductType list value", value);
    }

    static propTypes = {
        isHeading: PropTypes.bool,
        headingLabel: PropTypes.string,
        range: PropTypes.array,
        sliderLength: PropTypes.number,
        onValueChangeFinish: PropTypes.func,
        postFix: PropTypes.string,
        value: PropTypes.array
    }

    static defaultProps = {
        isHeading: false,
        range: [50, 100, 150, 200, 250, 300, 350, 400],
        sliderLength: 280,
        postFix: '',
        max: 500,
        min: 0,
        step: 1
    }

    componentDidMount = () => {
        const { value, min, max } = this.props;
        if (value && value.length) this.selectValue(value);
        else this.selectValue([min, max]);
    }

    componentDidUpdate(prevProps, prevState) {
        const { value } = this.props;
        if (value[1] !== prevProps.value[1]) this.setState({ selectedValues: value });
    }

    selectValue = (selectedValues) => {
        this.setState({ selectedValues });
    }

    /** Custom marker */
    CustomMarker = (label) => <WView dial={5} >
        <WView dial={5} margin={[2, 2]} style={[styles.markerContainer]} backgroundColor={Palette.white}>
            <WText color={Palette.secondary_theme_color1} center fontSize={14} fontFamily="Muli-Bold">{label}</WText>
        </WView>
    </WView>

    /** Render range of filter */
    renderRange = () => {
        const { range, postFix } = this.props;

        return (
            <WRow dial={5} style={{ alignSelf: "stretch", justifyContent: "space-between" }}>
                {/*<WText fontSize={10} center padding={[0, 4]}>min</WText>*/}
                {range.map((element, i) => <WText key={`range-${i}`} fontSize={10} center padding={[0, 4]}>{`${element}${postFix}`}</WText>)}
                {/*<WText fontSize={10} center padding={[0, 4]}>max</WText>*/}
            </WRow>
        );
    }

    /** Get range here */
    range = (value) => {
        const { range } = this.props;

        return (range[range.findIndex(ele => value <= ele)]);
    }

    /** Set step */
    onValueChange = (selectedValues) => {
        const { onValueChangeFinish } = this.props;
        onValueChangeFinish(selectedValues);

        this.setState(prevState => {
            if (selectedValues[0] !== prevState.selectedValues[0]) {
                return ({ selectedValues });
            } else {
                return ({ selectedValues });
            }
        });
    }

    render() {

        const { container } = styles;
        const {
            isHeading,
            headingLabel,
            sliderLength,
            max,
            min,
            step
        } = this.props;
        const { selectedValues } = this.state;
        // console.log(step);
        return (
            <WView dial={5} flex style={[container]}>
                <WView dial={4} style={{ alignSelf: 'stretch' }}>
                    <WText left fontFamily={"Muli-Bold"} fontSize={14}>Search Area(Km)</WText>
                </WView>
                <MultiSlider
                    onValuesChangeFinish={this.onValueChange.bind(this)}
                    selectedStyle={{
                        backgroundColor: Palette.theme_color,
                    }}
                    unselectedStyle={{
                        backgroundColor: Palette.border_color,
                    }}
                    values={selectedValues}
                    containerStyle={{
                        height: 40,
                    }}
                    trackStyle={{
                        height: 4,
                    }}
                    touchDimensions={{
                        height: 10,
                        width: 40,
                        borderRadius: 20,
                        slipDisplacement: 40,
                    }}
                    isMarkersSeparated={true}
                    enabledOne={false}
                    customMarkerLeft={this.CustomMarker.bind(this, selectedValues[0])}
                    customMarkerRight={this.CustomMarker.bind(this, selectedValues[1])}
                    min={min}
                    sliderLength={sliderLength}
                    max={max}
                    step={step}
                    allowOverlap
                    snapped
                />
            </WView>
        )
    }
}

const styles = {
    container: {
        height: 102,
        alignSelf: 'stretch'
    },
    markerContainer: {
        borderColor: Palette.theme_color,
        borderWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)) * 2,
        borderStyle: "solid",
        borderRadius: 15,
        height: 30,
        minWidth: 47
    }
}