// import { City, Country } from "country-state-city"
// import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select"
// import { useEffect, useState } from "react"
// import type { ICity } from 'country-state-city'
// import { calculationMethods } from "./data/constants"
// import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
// import { Label } from "./ui/label"
// import { Switch } from "./ui/switch"
// import { Controller, useForm } from "react-hook-form"
// import { Button } from "./ui/button"
// import { ChevronDown, ChevronUp } from "lucide-react"
// import type { PrayerSettingsForm } from "./types/types"
// import { ScrollArea } from "./ui/scroll-area"
// import { InfoIcon } from "./ui/Icons"
// import { TooltipContent, TooltipTrigger, Tooltip, TooltipProvider } from "./ui/tooltip"




// export const Settings = ({ setSettings }: { setSettings: (Settings: PrayerSettingsForm) => void }) => {

//     const [allCities, setAllCities] = useState<ICity[]>([])

//     const { control, handleSubmit, watch, setValue, setError, clearErrors, formState: { isSubmitting, errors, isValid } } = useForm<PrayerSettingsForm>({
//         mode: "onChange",
//         defaultValues: {
//             Country: {
//                 isoCode: "",
//                 name: ""
//             },
//             City: "",
//             CalculationMethod: "3",
//             JuristicMethod: "0",
//             MidnightMode: "0",
//             Tune: {
//                 Fajr: 0,
//                 Sunrise: 0,
//                 Dhuhr: 0,
//                 Asr: 0,
//                 Maghrib: 0,
//                 Isha: 0
//             }
//         }
//     })

//     const countries = Country.getAllCountries()

//     const country = watch("Country")
//     const tune = watch("Tune")

//     useEffect(() => {
//         console.log("inside settings useEffect")
//         let cities = City.getCitiesOfCountry(country.isoCode)
//         if (!cities) {
//             cities = []

//         }
//         setAllCities(cities!)
//     }, [country?.isoCode])



//     const savePrayerSettings = async (data: PrayerSettingsForm) => {
//         console.log(data)
//         await chrome.storage.local.set({ prayerSettings: data })
//         chrome.runtime.sendMessage(
//             { type: "prayerSettingsStored" }
//         )
//         setSettings(data)
//     }

//     return (
//         <ScrollArea className="h-115 rounded-md w-full">
//             <div className="w-full flex flex-col p-1">
//                 <form onSubmit={handleSubmit(savePrayerSettings)} className="space-y-4">
//                     {/* <h1 className="font-medium text-lg">Notification Settings</h1>

//                     <Controller
//                         name="MidnightMode"
//                         control={control}
//                         defaultValue={"0"}
//                         render={({ field }) => (
//                             <div className="flex items-center gap-3">

//                                 <TooltipProvider>
//                                     <Tooltip>
//                                         <TooltipTrigger className="flex gap-1 cursor-pointer">                                            <InfoIcon />
//                                             <Label htmlFor="midnightMode">Midnight Mode</Label>
//                                         </TooltipTrigger>
//                                         <TooltipContent>
//                                             <p>Determines Jafri method for Calculating Midnight (Mid Sunset to Fajr)</p>
//                                         </TooltipContent>
//                                     </Tooltip>
//                                 </TooltipProvider>

//                                 <Switch
//                                     id="midnightMode"
//                                     checked={field.value === "1"}
//                                     onCheckedChange={(checked) => {
//                                         field.onChange(checked ? "1" : "0");  // turn boolean back into string
//                                     }} />
//                             </div>


//                         )} />
//  */}


//                     <h1 className="font-medium text-[19px]">Prayer Time Settings</h1>

//                     <div>
//                         <Label className="mb-2">Country</Label>
//                         <Controller
//                             name="Country"
//                             control={control}
//                             rules={{
//                                 validate: (value) => (value && value.isoCode !== "") ? true : "Country is required"
//                             }}

//                             render={({ field }) => (
//                                 <>
//                                     <Select
//                                         onValueChange={(isoCode) => {
//                                             console.log("on value change country")
//                                             const selected = countries.find((c) => c?.isoCode === isoCode)
//                                             field.onChange({ isoCode, name: selected?.name ?? "" })
//                                             clearErrors("Country")
//                                         }}
//                                         value={field.value?.isoCode} required>
//                                         <SelectTrigger className="w-[320] mt-2">
//                                             <SelectValue placeholder="Select Your Country"> {field.value?.name ?? "Select Your Country"}</SelectValue>
//                                         </SelectTrigger>
//                                         <SelectContent className="h-80">
//                                             {countries.filter(Boolean).map((country) => (country &&
//                                                 <SelectItem
//                                                     key={country.isoCode}
//                                                     value={country.isoCode}>{country!.name}
//                                                 </SelectItem>
//                                             )
//                                             )}
//                                         </SelectContent>
//                                     </Select>

//                                     {
//                                         errors.Country && <p className="text-red-600 text-xs">{errors.Country.message}</p>
//                                     }
//                                 </>

//                             )} />
//                     </div>

//                     <div>

//                         <Label className="mb-2">City</Label>
//                         <Controller
//                             name="City"
//                             control={control}
//                             rules={{ validate: (value) => value !== "" ? true : "City is required" }}
//                             render={({ field }) => (
//                                 <>
//                                     <Select disabled={!country.isoCode} onValueChange={field.onChange} value={field.value} required>
//                                         <SelectTrigger className="w-[320] mt-2">
//                                             <SelectValue placeholder="Select Your City" />
//                                         </SelectTrigger>
//                                         <SelectContent className="h-80">
//                                             {
//                                                 (allCities.length === 0 && country.isoCode) ?
//                                                     <SelectItem value={country!.isoCode}>{country!.name}</SelectItem>
//                                                     : allCities.filter(Boolean).map(city =>
//                                                         <SelectItem key={city!.stateCode} value={city!.name}>
//                                                             {city!.name}
//                                                         </SelectItem>
//                                                     )
//                                             }
//                                         </SelectContent>
//                                     </Select>

//                                     {
//                                         errors.Country && <p className="text-red-600 text-xs">{errors.Country.message}</p>
//                                     }
//                                 </>

//                             )}
//                         />
//                     </div>

//                     <Label>Calculation Method</Label>
//                     <Controller
//                         name="CalculationMethod"
//                         control={control}
//                         defaultValue="3"
//                         render={({ field }) => (

//                             <Select value={field.value} onValueChange={val => field.onChange(val)} required>
//                                 <SelectTrigger className="w-[320] mt-2">
//                                     <SelectValue placeholder="Select a Calculation Method" />
//                                 </SelectTrigger>
//                                 <SelectContent className="h-60 w-[320]">
//                                     {calculationMethods.map((method, index) => <SelectItem key={index} value={index.toString()}> {method}</SelectItem>)}
//                                 </SelectContent>
//                             </Select>
//                         )} />

//                     <div className="my-0.5">
//                         <Label>Juristic Method / School</Label>
//                         <Controller
//                             name="JuristicMethod"
//                             control={control}
//                             render={({ field }) => (
//                                 <RadioGroup className="flex gap-3 mt-3 mb-5 px-2 " value={field.value} onValueChange={field.onChange}>
//                                     <RadioGroupItem value="0" id="0" className="cursor-pointer" />
//                                     <Label htmlFor="0">Shafi</Label>
//                                     <RadioGroupItem value="1" id="1" className="cursor-pointer" />
//                                     <Label htmlFor="1">Hanafi (Later Asr)</Label>
//                                 </RadioGroup>
//                             )} />

//                     </div>
//                     <div className="py-1">
//                         <Controller
//                             name="MidnightMode"
//                             control={control}
//                             defaultValue={"0"}
//                             render={({ field }) => (
//                                 <div className="flex items-center gap-3">

//                                     <TooltipProvider>
//                                         <Tooltip>
//                                             <TooltipTrigger className="flex gap-1 cursor-pointer mt-1">                                            <InfoIcon />
//                                                 <Label htmlFor="midnightMode">Midnight Mode</Label>
//                                             </TooltipTrigger>
//                                             <TooltipContent>
//                                                 <p>Determines Jafri method for Calculating Midnight (Mid Sunset to Fajr)</p>
//                                             </TooltipContent>
//                                         </Tooltip>
//                                     </TooltipProvider>

//                                     <Switch
//                                         id="midnightMode"
//                                         checked={field.value === "1"}
//                                         onCheckedChange={(checked) => {
//                                             field.onChange(checked ? "1" : "0");  // turn boolean back into string
//                                         }} />
//                                 </div>


//                             )} />

//                     </div>
//                     <div>

//                         <TooltipProvider>
//                             <Tooltip>
//                                 <TooltipTrigger className="flex gap-1 cursor-pointer mt-1">                <InfoIcon />
//                                     <Label> Adjust prayer time</Label>
//                                 </TooltipTrigger>
//                                 <TooltipContent className="max-w-[340] pl-3">
//                                     <p className="max-w-fit">Tune your prayer time in minutes. Adjusting time of one prayer does not affect time of other prayers</p>
//                                 </TooltipContent>
//                             </Tooltip>
//                         </TooltipProvider>

//                     </div>

//                     <div className="gap-2 grid grid-cols-3">
//                         {Object.keys(tune).map(prayer => (
//                             <Controller
//                                 key={prayer}
//                                 name={`Tune.${prayer}`}
//                                 control={control}
//                                 render={({ field }) => (

//                                     <div className="m-1">
//                                         <strong> {prayer} </strong>
//                                         <div className="flex">

//                                             <input type="number" max={30} min={-15} {...field} className="border text-center w-15" />

//                                             <div className="flex flex-col">

//                                                 <Button
//                                                     size={"xs"}
//                                                     type="button"
//                                                     variant={"ghost"}
//                                                     disabled={(field.value) >= 30 ? true : false}
//                                                     onClick={() => { setValue(`Tune.${prayer}`, field.value + 1) }}
//                                                     className="cursor-pointer">
//                                                     <ChevronUp />
//                                                 </Button>

//                                                 <Button
//                                                     size={"xs"}
//                                                     type="button"
//                                                     variant={"ghost"}
//                                                     disabled={(field.value) <= -15 ? true : false}
//                                                     onClick={() => { setValue(`Tune.${prayer}`, field.value - 1) }}
//                                                     className="cursor-pointer">
//                                                     <ChevronDown />
//                                                 </Button>

//                                             </div>
//                                         </div>
//                                     </div>)} />

//                         ))}
//                     </div>
//                     <Button type="submit" disabled={isSubmitting || !isValid} className="w-full cursor-pointer">{isSubmitting ? <span className="cursor-pointer h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-white/90" /> : "Save"}</Button>
//                 </form >
//             </div >
//         </ScrollArea>
//     )
// }

// //todo: add notification setting form and logic.


import { City, Country } from "country-state-city"
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import type { ICity } from 'country-state-city'
import { calculationMethods } from "./data/constants"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Controller, useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { ChevronDown, ChevronUp, MapPin, Calculator, BookOpen, Moon, Sliders, Check } from "lucide-react"
import type { PrayerSettingsForm } from "./types/types"
import { ScrollArea } from "./ui/scroll-area"
import { TooltipContent, TooltipTrigger, Tooltip, TooltipProvider } from "./ui/tooltip"

// Section wrapper with icon + title
const SettingsSection = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <div className="space-y-3">
        <div className="flex items-center gap-2 pb-1 border-b border-[#e8e4f0]">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-[#1D596D]/10">
                <Icon className="w-3.5 h-3.5 text-[#1D596D]" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#1D596D]">{title}</span>
        </div>
        {children}
    </div>
)

export const Settings = ({ setSettings }: { setSettings: (Settings: PrayerSettingsForm) => void }) => {
    const [allCities, setAllCities] = useState<ICity[]>([])
    const [saved, setSaved] = useState(false)

    const { control, handleSubmit, watch, setValue, clearErrors, formState: { isSubmitting, errors, isValid } } = useForm<PrayerSettingsForm>({
        mode: "onChange",
        defaultValues: {
            Country: { isoCode: "", name: "" },
            City: "",
            CalculationMethod: "3",
            JuristicMethod: "0",
            MidnightMode: "0",
            Tune: { Fajr: 0, Sunrise: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 }
        }
    })

    const countries = Country.getAllCountries()
    const country = watch("Country")
    const tune = watch("Tune")

    useEffect(() => {
        let cities = City.getCitiesOfCountry(country.isoCode)
        setAllCities(cities ?? [])
    }, [country?.isoCode])

    const savePrayerSettings = async (data: PrayerSettingsForm) => {
        await chrome.storage.local.set({ prayerSettings: data })
        chrome.runtime.sendMessage({ type: "prayerSettingsStored" })
        setSettings(data)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <ScrollArea className="h-[460px] w-full">
            <div className="px-1 pb-4">
                {/* Header */}
                <div className="mb-5 pt-1">
                    <h1 className="font-prompt font-semibold text-[18px] text-[#3A3843]">Settings</h1>
                    <p className="text-[11px] text-[#3A3843]/50 font-numans mt-0.5">Configure your prayer time preferences</p>
                </div>

                <form onSubmit={handleSubmit(savePrayerSettings)} className="space-y-5">

                    {/* Location Section */}
                    <SettingsSection icon={MapPin} title="Location">
                        <div className="grid grid-cols-2 gap-2">
                            {/* Country */}
                            <div className="col-span-2">
                                <Label className="text-[11px] text-[#3A3843]/60 font-numans mb-1.5 block">Country</Label>
                                <Controller
                                    name="Country"
                                    control={control}
                                    rules={{ validate: (v) => (v && v.isoCode !== "") ? true : "Required" }}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                onValueChange={(isoCode) => {
                                                    const selected = countries.find((c) => c?.isoCode === isoCode)
                                                    field.onChange({ isoCode, name: selected?.name ?? "" })
                                                    clearErrors("Country")
                                                }}
                                                value={field.value?.isoCode}>
                                                <SelectTrigger className="w-full h-9 text-[13px] border-[#e8e4f0] bg-white/60 focus:ring-[#1D596D]/20 focus:border-[#1D596D]">
                                                    <SelectValue placeholder="Select country">
                                                        {field.value?.name || "Select country"}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent className="h-72">
                                                    {countries.filter(Boolean).map((c) => (
                                                        <SelectItem key={c.isoCode} value={c.isoCode} className="text-[13px]">
                                                            {c.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.Country && <p className="text-red-500 text-[10px] mt-1">{errors.Country.message}</p>}
                                        </>
                                    )} />
                            </div>

                            {/* City */}
                            <div className="col-span-2">
                                <Label className="text-[11px] text-[#3A3843]/60 font-numans mb-1.5 block">City</Label>
                                <Controller
                                    name="City"
                                    control={control}
                                    rules={{ validate: (v) => v !== "" ? true : "Required" }}
                                    render={({ field }) => (
                                        <Select disabled={!country.isoCode} onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full h-9 text-[13px] border-[#e8e4f0] bg-white/60 focus:ring-[#1D596D]/20 focus:border-[#1D596D] disabled:opacity-40">
                                                <SelectValue placeholder="Select city" />
                                            </SelectTrigger>
                                            <SelectContent className="h-72">
                                                {allCities.length === 0 && country.isoCode
                                                    ? <SelectItem value={country.isoCode} className="text-[13px]">{country.name}</SelectItem>
                                                    : allCities.filter(Boolean).map(city => (
                                                        <SelectItem key={city.stateCode + city.name} value={city.name} className="text-[13px]">
                                                            {city.name}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    )} />
                            </div>
                        </div>
                    </SettingsSection>

                    {/* Calculation Section */}
                    <SettingsSection icon={Calculator} title="Calculation">
                        <div>
                            <Label className="text-[11px] text-[#3A3843]/60 font-numans mb-1.5 block">Method</Label>
                            <Controller
                                name="CalculationMethod"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full h-9 text-[13px] border-[#e8e4f0] bg-white/60">
                                            <SelectValue placeholder="Select method" />
                                        </SelectTrigger>
                                        <SelectContent className="h-60">
                                            {calculationMethods.map((method, i) => (
                                                <SelectItem key={i} value={i.toString()} className="text-[13px]">{method}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )} />
                        </div>
                    </SettingsSection>

                    {/* School Section */}
                    <SettingsSection icon={BookOpen} title="Juristic School">
                        <Controller
                            name="JuristicMethod"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup className="flex gap-3" value={field.value} onValueChange={field.onChange}>
                                    {[{ value: "0", label: "Shafi" }, { value: "1", label: "Hanafi" }].map(opt => (
                                        <label
                                            key={opt.value}
                                            htmlFor={`juristic-${opt.value}`}
                                            className={`flex-1 flex items-center justify-center gap-2 h-9 rounded-lg border text-[13px] font-numans cursor-pointer transition-all
                                                ${field.value === opt.value
                                                    ? "border-[#1D596D] bg-[#1D596D]/8 text-[#1D596D] font-medium"
                                                    : "border-[#e8e4f0] bg-white/60 text-[#3A3843]/60 hover:border-[#1D596D]/40"}`}>
                                            <RadioGroupItem value={opt.value} id={`juristic-${opt.value}`} className="sr-only" />
                                            {opt.label}
                                            {opt.value === "1" && <span className="text-[10px] text-[#3A3843]/40">(Later Asr)</span>}
                                        </label>
                                    ))}
                                </RadioGroup>
                            )} />
                    </SettingsSection>

                    {/* Midnight Mode */}
                    <SettingsSection icon={Moon} title="Midnight Mode">
                        <Controller
                            name="MidnightMode"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center justify-between py-1">
                                    <div>
                                        <p className="text-[13px] text-[#3A3843] font-numans">Jafri Midnight Calculation</p>
                                        <p className="text-[11px] text-[#3A3843]/45 mt-0.5">Mid sunset to Fajr instead of midnight</p>
                                    </div>
                                    <Switch
                                        checked={field.value === "1"}
                                        onCheckedChange={(checked) => field.onChange(checked ? "1" : "0")}
                                        className="data-[state=checked]:bg-[#1D596D]" />
                                </div>
                            )} />
                    </SettingsSection>

                    {/* Tune Section */}
                    <SettingsSection icon={Sliders} title="Fine-tune (minutes)">
                        <div className="grid grid-cols-3 gap-2">
                            {Object.keys(tune).map(prayer => (
                                <Controller
                                    key={prayer}
                                    name={`Tune.${prayer}`}
                                    control={control}
                                    render={({ field }) => (
                                        <div className="flex flex-col items-center gap-1 p-2 rounded-lg border border-[#e8e4f0] bg-white/60">
                                            <span className="text-[10px] font-semibold text-[#1D596D] uppercase tracking-wide">{prayer}</span>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    size="xs"
                                                    type="button"
                                                    variant="ghost"
                                                    disabled={field.value <= -15}
                                                    onClick={() => setValue(`Tune.${prayer}`, field.value - 1)}
                                                    className="h-5 w-5 p-0 text-[#3A3843]/50 hover:text-[#1D596D] cursor-pointer">
                                                    <ChevronDown className="w-3 h-3" />
                                                </Button>
                                                <input
                                                    type="number"
                                                    max={30}
                                                    min={-15}
                                                    {...field}
                                                    className="w-8 text-center text-[13px] font-numans font-medium text-[#3A3843] bg-transparent border-none outline-none" />
                                                <Button
                                                    size="xs"
                                                    type="button"
                                                    variant="ghost"
                                                    disabled={field.value >= 30}
                                                    onClick={() => setValue(`Tune.${prayer}`, field.value + 1)}
                                                    className="h-5 w-5 p-0 text-[#3A3843]/50 hover:text-[#1D596D] cursor-pointer">
                                                    <ChevronUp className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    )} />
                            ))}
                        </div>
                    </SettingsSection>

                    {/* Save Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        className={`w-full h-10 font-numans text-[13px] font-medium transition-all cursor-pointer
                            ${saved
                                ? "bg-emerald-500 hover:bg-emerald-500 text-white"
                                : "bg-[#1D596D] hover:bg-[#1D596D]/90 text-white"}`}>
                        {isSubmitting
                            ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            : saved
                                ? <><Check className="w-3.5 h-3.5 mr-1.5" />Saved</>
                                : "Save Settings"
                        }
                    </Button>

                </form>
            </div>
        </ScrollArea>
    )
}